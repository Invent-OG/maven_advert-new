import { NextResponse } from "next/server";
import { db, portfolios } from "@/lib/db";
import { eq } from "drizzle-orm";

// CREATE (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, content, layoutId, images, createdBy } = body;

    if (!title || !description || typeof layoutId !== "number" || !images) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(portfolios)
      .values({
        title,
        description,
        content,
        layoutId,
        images: JSON.stringify(images),
        createdBy,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}

// GET ALL (GET)
// GET ALL (GET)
export async function GET() {
  try {
    const data = await db.select().from(portfolios);

    // FIX: Convert images string -> real array
    const parsed = data.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
    }));

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

// UPDATE (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, content, layoutId, images } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Portfolio ID required" },
        { status: 400 }
      );
    }

    if (layoutId !== undefined && typeof layoutId !== "number") {
      return NextResponse.json(
        { error: "layoutId must be a number" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(portfolios)
      .set({
        title,
        description,
        content,
        layoutId,
        images: images ? JSON.stringify(images) : undefined,
      })
      .where(eq(portfolios.id, id))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Portfolio ID required" },
        { status: 400 }
      );
    }

    const deleted = await db
      .delete(portfolios)
      .where(eq(portfolios.id, id))
      .returning();

    return NextResponse.json(
      { message: "Portfolio deleted", deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
