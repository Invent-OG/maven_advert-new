import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const timestamp = new Date().toISOString();
    return NextResponse.json({
      success: true,
      message: "Test API route is working",
      timestamp,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
