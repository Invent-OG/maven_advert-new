import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

/* -----------------------------
   Type Definitions
----------------------------- */
interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  whatsapp_number: string;
  city?: string;
  created_at?: string;
}

interface TransformedLead {
  id: string;
  name: string;
  email: string;
  message: string;
  whatsappNumber: string;
  city?: string;
  createdAt?: Date;
}

interface ErrorResponse {
  error: string;
}

/* -----------------------------
   GET: Fetch Leads
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

    // Base query
    let query = supabase
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply search filter
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(
        `name.ilike.${searchPattern},whatsapp_number.ilike.${searchPattern},email.ilike.${searchPattern},message.ilike.${searchPattern}`
      );
    }

    // Apply date filter
    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);

      query = query
        .gte("created_at", dateObj.toISOString())
        .lt("created_at", nextDay.toISOString());
    }

    // Pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json<ErrorResponse>(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform snake_case → camelCase
    const transformedLeads: TransformedLead[] = (data as Lead[]).map(
      (lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        message: lead.message,
        whatsappNumber: lead.whatsapp_number,
        city: lead.city,
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
