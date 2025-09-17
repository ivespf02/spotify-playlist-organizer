import { NextResponse } from "next/server";
import axios from "axios";
import generateCodeVerifier from "@/utils/generateCodeVerifier";
import generateCodeChallenge from "@/utils/generateCodeChallenge";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    scope,
    challenge,
    verifier,
  }: { scope: string; verifier: string; challenge: any } = body;

  if (!challenge) {
    return NextResponse.json(
      {
        error: "No challenge detected",
      },
      { status: 400 }
    );
  }

  if (!verifier) {
    return NextResponse.json(
      {
        error: "No verifier detected",
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
    params.append("response_type", "code");
    params.append("redirect_uri", callbackURL);
    params.append(
      "scope",
      scope ||
        "user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-modify user-library-read"
    );
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    console.log(verifier);

    return NextResponse.json({
      verifier: verifier,
      spotifyUrl: `https://accounts.spotify.com/authorize?${params.toString()}`,
    });
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
