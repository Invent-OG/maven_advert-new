import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db, leads as leadsTable } from "@/lib/db";
import { and, count, desc, eq, gte, ilike, lt, or } from "drizzle-orm";

/* -----------------------------
   Type Definitions
----------------------------- */
type Lead = typeof leadsTable.$inferSelect;

interface TransformedLead {
  id: string;
  name: string;
  email: string;
  message: string;
  whatsappNumber: string;
  createdAt?: Date;
}

interface ErrorResponse {
  error: string;
}

/* -----------------------------
   Initialize Email Client
----------------------------- */
const resend = new Resend(process.env.RESEND_API_KEY);

/* -----------------------------
   GET: Fetch Leads (Admin)
----------------------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const date = searchParams.get("date");

    if (page < 1 || limit < 1) {
      return NextResponse.json<ErrorResponse>(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const filters = [];

    if (search) {
      const pattern = `%${search}%`;
      filters.push(
        or(
          ilike(leadsTable.name, pattern),
          ilike(leadsTable.whatsappNumber, pattern),
          ilike(leadsTable.email, pattern),
          ilike(leadsTable.message, pattern)
        )
      );
    }

    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);
      filters.push(
        and(
          gte(leadsTable.createdAt, dateObj),
          lt(leadsTable.createdAt, nextDay)
        )
      );
    }

    const whereClause =
      filters.length === 0
        ? undefined
        : filters.length === 1
        ? filters[0]
        : and(...filters);

    const [{ total }] = await (whereClause
      ? db.select({ total: count() }).from(leadsTable).where(whereClause)
      : db.select({ total: count() }).from(leadsTable));
    const totalCount = Number(total ?? 0);

    const data: Lead[] = await (whereClause
      ? db
          .select()
          .from(leadsTable)
          .where(whereClause)
          .orderBy(desc(leadsTable.createdAt))
          .limit(limit)
          .offset(offset)
      : db
          .select()
          .from(leadsTable)
          .orderBy(desc(leadsTable.createdAt))
          .limit(limit)
          .offset(offset));

    const transformedLeads: TransformedLead[] = data.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      message: lead.message,
      whatsappNumber: lead.whatsappNumber,
      createdAt: lead.createdAt,
    }));

    return NextResponse.json({
      leads: transformedLeads,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("Server error:", message);
    return NextResponse.json<ErrorResponse>(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* -----------------------------
   POST: Add Lead + Send Emails
----------------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, whatsappNumber } = body;

    if (!name || !email || !message || !whatsappNumber) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const [insertedLead] = await db
      .insert(leadsTable)
      .values({
        name,
        email,
        message,
        whatsappNumber,
      })
      .returning();

    if (!insertedLead) {
      throw new Error("Failed to create lead");
    }

    /* ---------------------------------
       ✅ Send Thank-You Email to User
    ---------------------------------- */
    try {
      const userEmail = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // works until domain verified
        to: email,
        subject: "Thank you for contacting Maven Advert!",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hey ${name},</h2>
            <p>Thank you for reaching out to <strong>Maven Advert</strong>!</p>
            <p>We’ve received your message and our team will get back to you soon.</p>
            <hr />
            <p><strong>Your message:</strong></p>
            <blockquote>${message}</blockquote>
            <p>Best regards,<br/>The Maven Advert Team</p>
          </div>
        `,
      });
      console.log("✅ User thank-you email sent:", userEmail);
    } catch (emailError) {
      console.error("❌ Failed to send user email:", emailError);
    }

    /* ---------------------------------
       ✅ Send Notification to Admin
    ---------------------------------- */
    try {
      const adminEmail = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "rahulachuz68@gmail.com",
        subject: `📩 New Lead from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${whatsappNumber}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><small>Received at ${new Date().toLocaleString()}</small></p>
          </div>
        `,
      });
      console.log("✅ Admin notification sent:", adminEmail);
    } catch (emailError) {
      console.error("❌ Failed to send admin email:", emailError);
    }

    return NextResponse.json({ success: true, lead: insertedLead });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* -----------------------------
   DELETE: Remove Lead
----------------------------- */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    await db.delete(leadsTable).where(eq(leadsTable.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("Server error:", message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
