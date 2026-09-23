import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Optional Vercel CRON_SECRET verification (if set in environment variables)
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const timestamp = new Date().toISOString();
    console.log(`⏰ [Vercel Cron] Test API executed at ${timestamp}`);

    return NextResponse.json({
      success: true,
      message: "Test cron job executed successfully",
      timestamp,
    });
  } catch (error) {
    console.error("❌ [Vercel Cron] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
