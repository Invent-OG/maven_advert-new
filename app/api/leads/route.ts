import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

/* -----------------------------
   Type Definitions
----------------------------- */
interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  whatsapp_number: string;
  created_at?: string;
}

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

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(
        `name.ilike.${searchPattern},whatsapp_number.ilike.${searchPattern},email.ilike.${searchPattern},message.ilike.${searchPattern}`
      );
    }

    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);
      query = query
        .gte("created_at", dateObj.toISOString())
        .lt("created_at", nextDay.toISOString());
    }

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json<ErrorResponse>(
        { error: error.message },
        { status: 500 }
      );
    }

    const transformedLeads: TransformedLead[] = (data as Lead[]).map(
      (lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        message: lead.message,
        whatsappNumber: lead.whatsapp_number,
        createdAt: lead.created_at ? new Date(lead.created_at) : undefined,
      })
    );

    return NextResponse.json({
      leads: transformedLeads,
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
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

    // ✅ Save to Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          message,
          whatsapp_number: whatsappNumber,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
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

    return NextResponse.json({ success: true, lead: data });
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

    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

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
