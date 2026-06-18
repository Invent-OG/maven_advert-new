import BlogsId from "@/components/BlogsPages/BlogsId";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validate as isUuid } from "uuid";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isIdUuid = isUuid(id);
  const [blog] = isIdUuid
    ? await db.select().from(blogs).where(eq(blogs.id, id))
    : await db.select().from(blogs).where(eq(blogs.slug, id));

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <BlogsId />;
}
