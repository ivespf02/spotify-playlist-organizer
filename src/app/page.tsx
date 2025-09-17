"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import setAuthFlowParams from "@/utils/setAuthFlowParams";
import { useRouter, useSearchParams } from "next/navigation";
import generateCodeVerifier from "@/utils/generateCodeVerifier";
import generateCodeChallenge from "@/utils/generateCodeChallenge";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function redirectToSpotifyAuthFlow() {
      const code = searchParams.get("code");

      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      if (!code) {
        const res = await fetch("/api/get-spotify-auth-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verifier: verifier,
            challenge: challenge
          })
        });

        console.log(res)

        const resJson = await res.json();

        if (resJson.spotifyUrl && resJson.verifier) {
          localStorage.setItem("verifier", resJson.verifier);
          router.push(resJson.spotifyUrl);
        }
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
