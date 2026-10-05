import BlogsId from "@/components/BlogsPages/BlogsId";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { validate as isUuid } from "uuid";
import { blogs as fallbackBlogs } from "@/data/blogs";
import { notFound, permanentRedirect } from "next/navigation";

export async function generateStaticParams() {
  try {
    // 1. Fetch blogs from DB if accessible
    const dbBlogs = await db.select().from(blogs);
    const dbParams = dbBlogs.flatMap((blog) => {
      const params = [];
      // Only generate the canonical slug to prevent duplicate URLs in GSC
      if (blog.slug) {
        const cleanedSlug = blog.slug.replace(/^\//, "");
        params.push({ id: cleanedSlug.split("/") });
      } else if (blog.id) {
        params.push({ id: [blog.id] });
      }
      return params;
    });

    // 2. Fetch from fallback blogs
    const fallbackParams = fallbackBlogs.flatMap((blog) => {
      const params = [];
      if (blog.id) {
        const cleanedSlug = blog.id.replace(/^\//, "");
        params.push({ id: cleanedSlug.split("/") });
      }
      return params;
    });

    // Merge and deduplicate
    const allPaths = new Set<string>();
    const result: { id: string[] }[] = [];

    for (const p of [...dbParams, ...fallbackParams]) {
      const pathStr = p.id.join("/");
      if (pathStr && !allPaths.has(pathStr)) {
        allPaths.add(pathStr);
        result.push(p);
      }
    }

    return result;
  } catch (error) {
    console.error("Failed to generate static params from DB, falling back to static blogs:", error);
    return fallbackBlogs.map((blog) => ({
      id: [blog.id],
    }));
  }
}

// app/blogs/[...id]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ id: string[] }> }) {
  const { id: idSegments } = await params;
  const fullId = idSegments.join("/");
  const cleanId = fullId.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "");
  
  let dbBlog = null;
  try {
    const isIdUuid = isUuid(idSegments[0]);
    const [blog] = isIdUuid
      ? await db.select().from(blogs).where(eq(blogs.id, idSegments[0]))
      : await db.select().from(blogs).where(
          or(
            eq(blogs.slug, cleanId),
            eq(blogs.slug, fullId),
            eq(blogs.slug, "/" + cleanId)
          )
        );
    dbBlog = blog;
  } catch (error) {
    console.error("Failed to fetch blog from database in generateMetadata:", error);
  }

  if (dbBlog) {
    const canonicalSlug = dbBlog.slug
      ? dbBlog.slug.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "")
      : dbBlog.id;
    return {
      title: dbBlog.metaTitle || dbBlog.title,
      description: dbBlog.metaDescription || dbBlog.description,
      alternates: {
        canonical: `/blogs/${canonicalSlug}`,
      },
      openGraph: {
        title: dbBlog.metaTitle || dbBlog.title,
        description: dbBlog.metaDescription || dbBlog.description,
        url: `/blogs/${canonicalSlug}`,
        type: "article",
        images: dbBlog.imageUrl ? [{ url: dbBlog.imageUrl }] : undefined,
      },
    };
  }

  // Fallback to local static blog
  const localBlog = fallbackBlogs.find(
    (b) =>
      b.id.toString() === cleanId ||
      b.id.toLowerCase() === cleanId.toLowerCase() ||
      b.id.toString() === fullId ||
      b.id.toLowerCase() === fullId.toLowerCase()
  );

  if (localBlog) {
    const canonicalSlug = localBlog.id.replace(/^\/+|\/+$/g, "");
    return {
      title: localBlog.title,
      description: localBlog.excerpt,
      alternates: {
        canonical: `/blogs/${canonicalSlug}`,
      },
      openGraph: {
        title: localBlog.title,
        description: localBlog.excerpt,
        url: `/blogs/${canonicalSlug}`,
        type: "article",
        images: localBlog.cover ? [{ url: localBlog.cover }] : undefined,
      },
    };
  }

  return {
    title: "Article Not Found",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string[] }> }) {
  const { id: idSegments } = await params;
  const fullId = idSegments.join("/");
  const cleanId = fullId.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "");

  // 1. If accessed by UUID but blog has a slug, permanently redirect (308) to canonical slug
  const isIdUuid = isUuid(idSegments[0]);
  if (isIdUuid) {
    try {
      const [blog] = await db.select().from(blogs).where(eq(blogs.id, idSegments[0]));
      if (blog?.slug) {
        const canonicalSlug = blog.slug.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "");
        permanentRedirect(`/blogs/${canonicalSlug}`);
      }
    } catch (e) {
      // Continue to render if DB check fails
    }
  }

  // 2. If accessed via legacy "/blogs/blog/..." or un-sanitized slashes, redirect to canonical clean slug
  if (!isIdUuid && fullId !== cleanId) {
    permanentRedirect(`/blogs/${cleanId}`);
  }

  // 3. Verify article exists
  let exists = false;
  try {
    const [blog] = isIdUuid
      ? await db.select().from(blogs).where(eq(blogs.id, idSegments[0]))
      : await db.select().from(blogs).where(
          or(
            eq(blogs.slug, cleanId),
            eq(blogs.slug, fullId),
            eq(blogs.slug, "/" + cleanId)
          )
        );
    if (blog) exists = true;
  } catch (error) {
    console.error("DB check error in Page:", error);
  }

  if (!exists) {
    const localBlog = fallbackBlogs.find(
      (b) =>
        b.id.toString() === cleanId ||
        b.id.toLowerCase() === cleanId.toLowerCase() ||
        b.id.toString() === fullId ||
        b.id.toLowerCase() === fullId.toLowerCase()
    );
    if (localBlog) exists = true;
  }

  // 4. If article does not exist, trigger true HTTP 404 (prevents Soft 404 in Google Search Console)
  if (!exists) {
    notFound();
  }

  return <BlogsId id={cleanId} />;
}
