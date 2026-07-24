import BlogsId from "@/components/BlogsPages/BlogsId";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validate as isUuid } from "uuid";
import { blogs as fallbackBlogs } from "@/data/blogs";

export async function generateStaticParams() {
  try {
    // 1. Fetch blogs from DB if accessible
    const dbBlogs = await db.select().from(blogs);
    const dbParams = dbBlogs.flatMap((blog) => {
      const params = [];
      if (blog.id) params.push({ id: blog.id });
      if (blog.slug) params.push({ id: blog.slug });
      return params;
    });

    // 2. Fetch from fallback blogs
    const fallbackParams = fallbackBlogs.flatMap((blog) => {
      const params = [];
      if (blog.id) params.push({ id: blog.id });
      return params;
    });

    // Merge and deduplicate
    const allIds = new Set<string>();
    const result: { id: string }[] = [];

    for (const p of [...dbParams, ...fallbackParams]) {
      if (p.id && !allIds.has(p.id)) {
        allIds.add(p.id);
        result.push(p);
      }
    }

    return result;
  } catch (error) {
    console.error("Failed to generate static params from DB, falling back to static blogs:", error);
    // If DB is not connected/accessible during build, return only fallback blogs
    return fallbackBlogs.map((blog) => ({
      id: blog.id,
    }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let dbBlog = null;
  try {
    const isIdUuid = isUuid(id);
    const [blog] = isIdUuid
      ? await db.select().from(blogs).where(eq(blogs.id, id))
      : await db.select().from(blogs).where(eq(blogs.slug, id));
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
    (b) => b.id.toString() === id || b.id.toLowerCase() === id.toLowerCase()
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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <BlogsId />;
}
