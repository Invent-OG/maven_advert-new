import axios from "axios";
import readline from "readline";
import fs from "fs";
import path from "path";

// Load env vars
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const DC = process.env.ZOHO_DC || "in";
// Hardcoding to ensure it matches what the user expects/configured in Zoho
const REDIRECT_URI =
  "http://maven-advert-new.vercel.app/api/zoho/oauth/callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Missing ZOHO_CLIENT_ID or ZOHO_CLIENT_SECRET in .env");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const authUrl = `https://accounts.zoho.${DC.toLowerCase()}/oauth/v2/auth?scope=ZohoBigin.settings.ALL,ZohoBigin.modules.ALL&client_id=${CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`;

console.log("\n🚀 Zoho Refresh Token Generator\n");
console.log("1. Visit the following URL in your browser:");
console.log(`\n${authUrl}\n`);
console.log(
  "2. Authorize the app. You will be redirected to a URL starting with:",
  REDIRECT_URI
);
console.log(
  "3. Copy the 'code' parameter from the URL (e.g., ?code=1000.xxxx)"
);

rl.question("\n👉 Paste the code here: ", async (code) => {
  if (!code) {
    console.error("❌ No code provided.");
    rl.close();
    return;
  }

  try {
    const tokenUrl = `https://accounts.zoho.${DC.toLowerCase()}/oauth/v2/token`;
    const params = new URLSearchParams();
    params.append("code", code.trim());
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("grant_type", "authorization_code");

    console.log("\n🔄 Exchanging code for tokens...");

    const { data } = await axios.post(tokenUrl, params);

    if (data.error) {
      console.error("❌ Error:", data.error);
    } else {
      console.log("\n✅ Success! Here are your tokens:\n");
      console.log(`Access Token: ${data.access_token}`);
      if (data.refresh_token) {
        console.log(`\n✨ Refresh Token: ${data.refresh_token}`);
        console.log(
          "\n👉 Update your .env file with this new ZOHO_REFRESH_TOKEN."
        );
      } else {
        console.log(
          "\n⚠️ No refresh token received. Make sure access_type=offline is used (it is in the URL above)."
        );
      }
    }
  } catch (error: any) {
    console.error(
      "❌ Failed to fetch tokens:",
      error.response?.data || error.message
    );
  } finally {
    rl.close();
  }
});
