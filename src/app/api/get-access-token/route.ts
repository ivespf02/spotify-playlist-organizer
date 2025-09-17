import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_SECRET_ID;

  if (!client_id) {
    return NextResponse.json(
      {
        error: "No client id detected",
      },
      { status: 400 }
    );
  }

  if (!client_secret) {
    return NextResponse.json(
      {
        error: "No client secret detected",
      },
      { status: 400 }
    );
  }

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }), // body
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.data.access_token;

    return NextResponse.json({ accessToken: token });
  } catch (error: any) {
    console.error("Error getting Spotify token:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: `Error getting Spotify token: ${error.response?.data || error.message}`
      },
      { status: 500 }
    );
  }
}
