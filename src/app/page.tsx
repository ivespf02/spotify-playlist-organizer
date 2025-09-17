"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import setAuthFlowParams from "@/utils/setAuthFlowParams";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function redirectToSpotifyAuthFlow() {
      console.log(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
      if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) {
        console.error("Spotify client id not defined");
        throw new Error("Spotify client id not defined");
      }

      const code = searchParams.get("code");

      if (!code) {
        const res = await setAuthFlowParams(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
        );

        if (!res.spotify_url) {
          throw new Error(
            "An error occurred while generating spotify authentication URL"
          );
        }

        router.push(res.spotify_url);
      }
    }

    redirectToSpotifyAuthFlow();
  }, []);

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
