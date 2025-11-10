import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { testimonialSchema } from "@/lib/types/testimonials";

/**
 * PUT - Update an existing testimonial
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = testimonialSchema.parse(body);

    const [updated] = await db
      .update(testimonials)
      .set({
        name: data.name,
        role: data.role,
        content: data.content,
        imageUrl: data.imageUrl,
        youtubeUrl: data.youtubeUrl || null,
      })
      .where(eq(testimonials.id, id))
      .returning({
        id: testimonials.id,
        name: testimonials.name,
        role: testimonials.role,
        content: testimonials.content,
        imageUrl: testimonials.imageUrl,
        youtubeUrl: testimonials.youtubeUrl,
      });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error("[PUT Testimonials]", error);

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
