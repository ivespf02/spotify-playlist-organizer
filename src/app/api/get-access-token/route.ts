import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const { code, clientId }: { code: string; clientId: string } = body;

  if (!code) {
    return NextResponse.json(
      {
        error: "No code provided",
      },
      { status: 400 }
    );
  }

  if (!clientId) {
    return NextResponse.json(
      {
        error: "No client id provided",
      },
      { status: 400 }
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const callback_url = process.env.CALLBACK_URL;

  if (!client_id) {
    return NextResponse.json(
      {
        error: "No client id detected",
      },
      { status: 400 }
    );
  }

  if (!callback_url) {
    return NextResponse.json(
      {
        error: "No callback URL detected",
      },
      { status: 400 }
    );
  }

  try {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.NEXT_PUBLIC_CALLBACK_URL || "");
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
