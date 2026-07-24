import BlogsId from "@/components/BlogsPages/BlogsId";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { validate as isUuid } from "uuid";
import { blogs as fallbackBlogs } from "@/data/blogs";

export async function generateStaticParams() {
  try {
    // 1. Fetch blogs from DB if accessible
    const dbBlogs = await db.select().from(blogs);
    const dbParams = dbBlogs.flatMap((blog) => {
      const params = [];
      if (blog.id) params.push({ id: [blog.id] });
      if (blog.slug) {
        const cleanedSlug = blog.slug.replace(/^\//, ""); // Remove leading slash
        params.push({ id: cleanedSlug.split("/") });
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
    // If DB is not connected/accessible during build, return only fallback blogs
    return fallbackBlogs.map((blog) => ({
      id: [blog.id],
    }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string[] }> }) {
  const { id: idSegments } = await params;
  const fullId = idSegments.join("/");
  const fullIdWithSlash = "/" + fullId;
  
  let dbBlog = null;
  try {
    const isIdUuid = isUuid(idSegments[0]);
    const [blog] = isIdUuid
      ? await db.select().from(blogs).where(eq(blogs.id, idSegments[0]))
      : await db.select().from(blogs).where(
          or(
            eq(blogs.slug, fullId),
            eq(blogs.slug, fullIdWithSlash)
          )
        );
    dbBlog = blog;
  } catch (error) {
    console.error("Failed to fetch blog from database in generateMetadata:", error);
  }

  if (dbBlog) {
    return {
      title: dbBlog.metaTitle || dbBlog.title,
      description: dbBlog.metaDescription || dbBlog.description,
    };
  }

  // Fallback to local static blog
  const localBlog = fallbackBlogs.find(
    (b) => b.id.toString() === fullId || b.id.toLowerCase() === fullId.toLowerCase()
  );

  if (localBlog) {
    return {
      title: localBlog.title,
      description: localBlog.excerpt,
    };
  }

  return {
    title: "Article Not Found",
  };
}

export default async function Page({ params }: { params: Promise<{ id: string[] }> }) {
  const { id } = await params;
  return <BlogsId id={id.join("/")} />;
}
