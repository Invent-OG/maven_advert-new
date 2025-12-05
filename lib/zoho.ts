import axios, { AxiosError } from "axios";

/**
 * 🌍 Zoho Data Center (defaults to India)
 */
const dc: string = process.env.ZOHO_DC ?? "in";

/**
 * 🧩 Zoho Bigin API Base URL
 * Important: Bigin uses `/bigin/v2`, not `/crm/v2`
 */
const ZOHO_BASE_URL = `https://www.zohoapis.${dc.toLowerCase()}/bigin/v2`;

/**
 * 🔁 Redirect URI — must match the one in Zoho API Console
 */
const REDIRECT_URI =
  process.env.ZOHO_REDIRECT_URI ||
  "http://localhost:3000/api/zoho/oauth/callback";

/* -----------------------------------------------------------------
   🔐 Step 1: Get Access Token using the Refresh Token
------------------------------------------------------------------ */
async function getAccessToken(): Promise<string> {
  try {
    const tokenUrl = `https://accounts.zoho.${dc.toLowerCase()}/oauth/v2/token`;

    const { data } = await axios.post(tokenUrl, null, {
      params: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "refresh_token",
      },
    });

    if (data.error) {
      throw new Error(`Zoho API Error: ${data.error}`);
    }

    if (!data.access_token) {
      throw new Error("Access token missing in Zoho response");
    }

    console.log("✅ Zoho Bigin Access Token retrieved successfully");
    return data.access_token as string;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Zoho Access Token Error:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("❌ Unexpected error while fetching token:", error);
    }
    throw new Error("Failed to retrieve Zoho access token");
  }
}

/* -----------------------------------------------------------------
   🚀 Step 2: Add a Lead (Contact) to Zoho Bigin
------------------------------------------------------------------ */
export async function addLeadToZohoBigin({
  name,
  email,
  whatsappNumber,
  message,
}: {
  name: string;
  email: string;
  whatsappNumber: string;
  message: string;
}): Promise<unknown> {
  try {
    const token = await getAccessToken();

    // 🧩 Validate required fields before sending
    if (!name || !email || !whatsappNumber) {
      throw new Error("Missing required fields for Zoho contact");
    }

    // 📨 Build the Zoho Bigin contact payload
    const payload = {
      data: [
        {
          Last_Name: name || "Unknown", // Required by Bigin
          Email: email,
          Mobile: whatsappNumber,
          Description: message,
          Source: "Website Contact Form",
        },
      ],
    };

    console.log("📤 Sending contact to Zoho Bigin:", payload);

    // 🧠 POST request to Zoho Bigin API
    const response = await axios.post(`${ZOHO_BASE_URL}/Contacts`, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Contact successfully added to Zoho Bigin:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Zoho Bigin API Error:", {
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("❌ Unexpected error adding contact to Zoho Bigin:", error);
    }
    throw new Error("Failed to add contact to Zoho Bigin");
  }
}
