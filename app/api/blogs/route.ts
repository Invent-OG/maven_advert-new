import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq, count, and, sql } from "drizzle-orm";
import { z, ZodError } from "zod";
import { createBlogSchema } from "@/lib/types/blogs";
import { nanoid } from "nanoid";

/* --------------------------------------------------------------------------
   GET - Fetch blogs with pagination, search, and optional category filter
--------------------------------------------------------------------------- */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    const offset = (page - 1) * limit;
    const whereConditions = [];

    // 🧩 Search filter
    if (search) {
      whereConditions.push(
        sql`(${blogs.title} ILIKE ${`%${search}%`} OR
              ${blogs.description} ILIKE ${`%${search}%`} OR
              ${blogs.category} ILIKE ${`%${search}%`} OR
              ${blogs.author} ILIKE ${`%${search}%`})`
      );
    }

    // 🧩 Category filter
    if (category) {
      whereConditions.push(eq(blogs.category, category));
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // 🧩 Count total blogs
    const [{ value: totalCount }] = await db
      .select({ value: count() })
      .from(blogs)
      .where(whereClause ?? sql`1=1`);

    // 🧩 Paginated query
    const allBlogs = await db
      .select()
      .from(blogs)
      .where(whereClause ?? sql`1=1`)
      .orderBy(sql`${blogs.createdAt} DESC`)
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      blogs: allBlogs,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("GET /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* --------------------------------------------------------------------------
   POST - Create a new blog post safely
--------------------------------------------------------------------------- */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ Safe Zod validation
    const parsed = createBlogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ✅ Normalize strings
    const normalizedTitle = data.title.trim();

    // ✅ Ensure slug always exists
    const slug =
      data.slug && data.slug.trim() !== ""
        ? data.slug.trim().toLowerCase()
        : normalizedTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") + `-${nanoid(6)}`;

    // ✅ Ensure heading always exists
    const heading = data.heading?.trim() || normalizedTitle;

    // ✅ Insert into DB with guaranteed non-null values
    const [blog] = await db
      .insert(blogs)
      .values({
        title: normalizedTitle,
        slug,
        description: data.description.trim(),
        imageUrl: data.imageUrl.trim(),
        content: data.content,
        category: data.category.trim(),
        heading,
        author: data.author.trim(),
        readTime: data.readTime.trim(),
      })
      .returning({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        description: blogs.description,
        imageUrl: blogs.imageUrl,
        content: blogs.content,
        category: blogs.category,
        heading: blogs.heading,
        author: blogs.author,
        readTime: blogs.readTime,
        createdAt: blogs.createdAt,
      });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("POST /blogs error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
