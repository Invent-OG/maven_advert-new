import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: `Zoho Error: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const dc = process.env.ZOHO_DC || "in";
  const redirectUri =
    process.env.ZOHO_REDIRECT_URI ||
    "http://localhost:3000/api/zoho/oauth/callback";

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing ZOHO_CLIENT_ID or ZOHO_CLIENT_SECRET in .env" },
      { status: 500 }
    );
  }

  try {
    const tokenUrl = `https://accounts.zoho.${dc.toLowerCase()}/oauth/v2/token`;

    // Exchange code for tokens
    const { data } = await axios.post(tokenUrl, null, {
      params: {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
    });

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    let message = "Tokens generated but .env update failed.";
    let envUpdated = false;

    // Automatically update .env file
    if (data.refresh_token) {
      try {
        const envPath = path.resolve(process.cwd(), ".env");
        let envContent = "";

        if (fs.existsSync(envPath)) {
          envContent = fs.readFileSync(envPath, "utf-8");
        }

        // Check if ZOHO_REFRESH_TOKEN exists
        const regex = /^ZOHO_REFRESH_TOKEN=.*$/m;

        if (regex.test(envContent)) {
          envContent = envContent.replace(
            regex,
            `ZOHO_REFRESH_TOKEN=${data.refresh_token}`
          );
        } else {
          envContent += `\nZOHO_REFRESH_TOKEN=${data.refresh_token}`;
        }

        fs.writeFileSync(envPath, envContent);
        envUpdated = true;
        message = "✅ .env file automatically updated!";
      } catch (err) {
        console.error("Failed to write to .env:", err);
        message = "⚠️ Could not write to .env file. Please update manually.";
      }
    }

    // Return the tokens in a nice HTML page
    return new NextResponse(
      `
      <html>
        <head>
          <title>Zoho Token Success</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; line-height: 1.5; }
            .card { background: #f4f4f5; padding: 2rem; border-radius: 0.5rem; border: 1px solid #e4e4e7; }
            h1 { color: #18181b; }
            code { background: #27272a; color: #4ade80; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; word-break: break-all; }
            .label { font-weight: bold; margin-bottom: 0.5rem; display: block; margin-top: 1rem; }
            .success { color: #16a34a; font-weight: bold; margin-top: 1rem; }
            .warning { color: #ca8a04; font-weight: bold; margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✅ Zoho Tokens Generated!</h1>
            
            <p class="${envUpdated ? "success" : "warning"}">${message}</p>
            
            ${
              envUpdated
                ? "<p><strong>🚀 Please RESTART your server terminal now to apply changes.</strong></p>"
                : ""
            }

            <span class="label">Refresh Token:</span>
            <code>${
              data.refresh_token ||
              "No refresh token returned (Check access_type=offline & prompt=consent)"
            }</code>
            
            <span class="label">Access Token:</span>
            <code>${data.access_token}</code>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (err: any) {
    console.error(
      "Zoho Token Exchange Error:",
      err.response?.data || err.message
    );
    return NextResponse.json(
      {
        error: "Failed to exchange token",
        details: err.response?.data || err.message,
      },
      { status: 500 }
    );
  }
}
