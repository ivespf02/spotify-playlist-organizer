import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const { code, verifier }: { code: string; verifier: string } = body;

  if (!code) {
    return NextResponse.json(
      {
        error: "No code provided",
      },
      { status: 400 }
    );
  }

   if (!verifier) {
    return NextResponse.json(
      {
        error: "No verifier provided",
      },
      { status: 400 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const callbackURL = process.env.CALLBACK_URL;

  if (!clientId) {
    return NextResponse.json(
      {
        error: "No client id detected",
      },
      { status: 400 }
    );
  }

  if (!callbackURL) {
    return NextResponse.json(
      {
        error: "No callback URL detected",
      },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", callbackURL || "");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();

    return NextResponse.json({ accessToken: access_token });
  } catch (error: any) {
    console.error(
      "Error getting Spotify token:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: `Error getting Spotify token: ${
          error.response?.data || error.message
        }`,
      },
      { status: 500 }
    );
  }
}
