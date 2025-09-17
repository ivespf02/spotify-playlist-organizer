"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import setAuthFlowParams from "@/utils/setAuthFlowParams";
import { useRouter, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/UserProfileI";
import getAccessToken from "@/utils/getAccessToken";
import axios from "axios";

export default function Home() {
  const [playlists, setPlaylists] = useState<any[]>();
  const [profile, setProfile] = useState<UserProfile>();
  const searchParams = useSearchParams();

  const [accessToken, setAccessToken] = useState<string>("");
  const [privateAccessToken, setPrivateAccessToken] = useState<string>("");

  useEffect(() => {
    async function getAccessToken() {
      const code = searchParams.get("code");
      const verifier = localStorage.getItem("verifier");

      if (!code || !verifier) return;

      const res = await fetch("/api/get-access-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code, verifier: verifier }),
      });

      const resJson = await res.json();

      if (resJson.accessToken) {
        setAccessToken(resJson.accessToken);
      }
    }

    getAccessToken();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const resJson = await result.json();

      setProfile(resJson);

      return resJson;
    };

    if (accessToken.length) fetchProfile();
  }, [accessToken]);

  async function createSpotifyPlaylist() {
    if (!profile || !profile.id) return;

    console.log(profile);
    const url = `https://api.spotify.com/v1/users/${profile.id}/playlists`;

    const data = {
      name: "New Playlist",
      description: "New playlist description",
      public: false,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Playlist created:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating playlist:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

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
          <button onClick={() => createSpotifyPlaylist()}>
            create playlist
          </button>
        </ul>
      </section>
    </div>
  );
}
