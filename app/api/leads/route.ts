import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db, leads as leadsTable } from "@/lib/db";
import { and, count, desc, eq, gte, ilike, lt, or } from "drizzle-orm";
import { addLeadToZohoBigin } from "@/lib/zoho";

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
// Initialized inside handler to avoid build errors

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
        { status: 400 },
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
          ilike(leadsTable.message, pattern),
        ),
      );
    }

    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);
      filters.push(
        and(
          gte(leadsTable.createdAt, dateObj),
          lt(leadsTable.createdAt, nextDay),
        ),
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
      { status: 500 },
    );
  }
}

/* -----------------------------
   POST: Add Lead + Send Emails
----------------------------- */
export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, message, whatsappNumber } = body;

    if (!name || !email || !message || !whatsappNumber) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
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
    /* ---------------------------------
       ✅ Send Thank-You Email to User
    ---------------------------------- */
    try {
      // In Resend testing mode, we can only send to the verified email
      const isTestMode = !process.env.RESEND_DOMAIN_VERIFIED; // Assuming this might be a flag, or we just hardcode the check
      const verifiedEmail = "Info@mavenadvert.com";

      const emailRecipient =
        process.env.NODE_ENV === "development" && email !== verifiedEmail
          ? verifiedEmail
          : email;

      const userEmail = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // works until domain verified
        to: emailRecipient,
        subject: "Thank you for contacting Maven Advert!",
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background-color: #000000; padding: 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; }
    .content { padding: 30px; color: #333333; line-height: 1.6; }
    .h2 { color: #000000; font-size: 20px; margin-bottom: 20px; }
    .summary { background-color: #f9f9f9; padding: 20px; border-left: 4px solid #DFB025; margin: 20px 0; border-radius: 4px; }
    .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888888; }
    .button { display: inline-block; padding: 12px 24px; background-color: #DFB025; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>MAVEN ADVERT</h1>
    </div>
    <div class="content">
      <h2 class="h2">Hello ${name},</h2>
      <p>Thank you for reaching out to us! We have successfully received your inquiry and our team is already reviewing it.</p>
      <p>We typically respond within 24 hours. In the meantime, feel free to browse our latest case studies or services on our website.</p>
      
      <div class="summary">
        <strong>Your Message:</strong><br/>
        "${message}"
      </div>

      <a href="https://mavenadvert.com" class="button">Visit Our Website</a>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Maven Advert. All rights reserved.</p>
      <p>Coimbatore, India</p>
    </div>
  </div>
</body>
</html>
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
        to: "Info@mavenadvert.com",
        subject: `📩 New Lead: ${name}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f0f2f5; padding: 20px; }
    .card { background-color: white; max-width: 500px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-top: 5px solid #007bff; }
    .row { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .label { font-weight: bold; color: #555; display: block; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; }
    .value { font-size: 16px; color: #000; }
    .timestamp { text-align: right; font-size: 12px; color: #999; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin-top:0; color: #333;">New Lead Received</h2>
    
    <div class="row">
      <span class="label">Name</span>
      <div class="value">${name}</div>
    </div>
    
    <div class="row">
      <span class="label">Email</span>
      <div class="value"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></div>
    </div>
    
    <div class="row">
      <span class="label">WhatsApp/Phone</span>
      <div class="value">${whatsappNumber}</div>
    </div>
    
    <div class="row" style="border-bottom: none;">
      <span class="label">Message</span>
      <div class="value" style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${message}</div>
    </div>

    <div class="timestamp">
      Received: ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>
        `,
      });
      console.log("✅ Admin notification sent:", adminEmail);
    } catch (emailError) {
      console.error("❌ Failed to send admin email:", emailError);
    }

    /* ---------------------------------
       ✅ Sync to Zoho Bigin
    ---------------------------------- */
    try {
      await addLeadToZohoBigin({
        name,
        email,
        whatsappNumber,
        message,
        leadSource: "Website Contact Form",
      });
    } catch (zohoError) {
      console.error("❌ Failed to sync to Zoho Bigin:", zohoError);
      // We don't throw here to ensure the user still gets a success response
    }

    return NextResponse.json({ success: true, lead: insertedLead });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
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
        { status: 400 },
      );
    }

    await db.delete(leadsTable).where(eq(leadsTable.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("Server error:", message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
