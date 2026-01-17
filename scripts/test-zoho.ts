import axios from "axios";
import fs from "fs";
import path from "path";

// Manually load environment variables from .env file
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    const value = rest.join("=");
    if (key && value) {
      process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
    }
  });
}

// We know it's IN based on previous tests
const DC = "in";

async function testGetAccessToken() {
  console.log("Testing Zoho Token Fetching (DC: IN)...");

  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    console.error("❌ Missing env vars");
    return;
  }

  const tokenUrl = `https://accounts.zoho.${DC}/oauth/v2/token`;

  // Try WITH redirect_uri
  try {
    console.log("\nAttempt 1: With redirect_uri");
    const { data } = await axios.post(tokenUrl, null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: "http://localhost:3000/api/zoho/oauth/callback",
        grant_type: "refresh_token",
      },
    });

    if (data.error) {
      console.log("❌ Failed with redirect_uri (API Error):", data);
    } else {
      console.log("✅ Success with redirect_uri:", data);
      return;
    }
  } catch (error: any) {
    console.log(
      "❌ Failed with redirect_uri (Network/Http):",
      error.response?.data || error.message
    );
  }

  // Try WITHOUT redirect_uri
  try {
    console.log("\nAttempt 2: WITHOUT redirect_uri");
    const { data } = await axios.post(tokenUrl, null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      },
    });

    if (data.error) {
      console.log("❌ Failed WITHOUT redirect_uri (API Error):", data);
    } else {
      console.log("✅ Success WITHOUT redirect_uri:", data);
      return;
    }
  } catch (error: any) {
    console.log(
      "❌ Failed WITHOUT redirect_uri (Network/Http):",
      error.response?.data || error.message
    );
  }
}

testGetAccessToken();
