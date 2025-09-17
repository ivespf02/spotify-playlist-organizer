"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import setAuthFlowParams from "@/utils/setAuthFlowParams";
import { useRouter, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/UserProfileI";
import getAccessToken from "@/utils/getAccessToken";

export default function Home() {
  const [playlists, setPlaylists] = useState<any[]>();
  const [profile, setProfile] = useState<UserProfile>();
  const searchParams = useSearchParams();

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    async function getAccessTokenAux() {
      if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) {
        console.error("Spotify client id not defined");
        throw new Error("Spotify client id not defined");
      }

      const code = searchParams.get("code");

      if (!code) return;

      const resAccessToken = await getAccessToken(
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        code
      );

      if (!resAccessToken.access_token) return;

      setAccessToken(resAccessToken.access_token);
    }

    getAccessTokenAux();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const resJson = await result.json();

      setProfile(resJson);

      const result2 = await fetch("/api/get-access-token", {  method: "GET" })
      console.log(await result2.json())
      return resJson;
    };

    if (accessToken.length) fetchProfile();
  }, [accessToken]);

  return (
    <div className={styles.page}>
      <h1>Display your Spotify Profile Data</h1>

      <section id="profile">
        <h2>
          Logged in as <span id="displayName"></span>
        </h2>
        <img id="avatar" width="200" src="#" />
        <ul>
          <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li>
          <li>
            Spotify URI: <a id="uri" href="#"></a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li>
        </ul>
      </section>
    </div>
  );
}
