import { NextResponse } from "next/server";
import { db, portfolios } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Portfolio ID required" },
        { status: 400 },
      );
    }

    const data = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, id));

    if (!data.length) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }

    const portfolio = data[0];

    const parsed = {
      ...portfolio,
      images: portfolio.images ? JSON.parse(portfolio.images) : [],
      blocks: portfolio.blocks ? JSON.parse(portfolio.blocks) : [],
    };

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("GET [id] ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 },
    );
  }
}
