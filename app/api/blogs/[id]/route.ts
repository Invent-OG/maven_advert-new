import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z, ZodError } from "zod";
import { createBlogSchema } from "@/lib/types/blogs";
import { validate as isUuid } from "uuid";

/**
 * GET - Fetch a single blog by ID
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ correct type
) {
  try {
    const { id } = await context.params; // ✅ await the params

    const isIdUuid = isUuid(id);
    const [blog] = isIdUuid
      ? await db.select().from(blogs).where(eq(blogs.id, id))
      : await db.select().from(blogs).where(eq(blogs.slug, id));

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

   return NextResponse.json({
     success: true,
     blog: {
       id: blog.id,
       title: blog.title,
       slug: blog.slug,
       heading: blog.heading,
       description: blog.description,
       imageUrl: blog.imageUrl,
       author: blog.author,
       readTime: blog.readTime,
       createdAt: blog.createdAt,
       metaTitle: blog.metaTitle,
       metaDescription: blog.metaDescription,

       // 🔥 Convert string → array for UI
       content: blog.content?.includes("\n")
         ? blog.content.split("\n\n")
         : [blog.content],

       // 🔥 Convert CSV string → array of tags
       tags: blog.category?.includes(",")
         ? blog.category.split(",").map((t) => t.trim())
         : [blog.category],

       // 🔥 prevent crash when no comments implemented yet
       comments: [],
     },
   });

  } catch (error) {
    console.error("GET /blogs/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update blog by ID
 */
export async function PUT(
  req: NextRequest, // ✅ must be NextRequest (not Request)
  context: { params: Promise<{ id: string }> } // ✅ must be Promise type
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const data = createBlogSchema.parse(body);

    const [existing] = await db.select().from(blogs).where(eq(blogs.id, id));
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    const [updatedBlog] = await db
      .update(blogs)
      .set(data)
      .where(eq(blogs.id, id))
      .returning({
        id: blogs.id,
        title: blogs.title,
        description: blogs.description,
        content: blogs.content,
        imageUrl: blogs.imageUrl,
        category: blogs.category,
        author: blogs.author,
        readTime: blogs.readTime,
        createdAt: blogs.createdAt,
        slug: blogs.slug,
        metaTitle: blogs.metaTitle,
        metaDescription: blogs.metaDescription,
      });

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("PUT /blogs/[id] error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete blog by ID
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    await db.delete(blogs).where(eq(blogs.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /blogs/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
