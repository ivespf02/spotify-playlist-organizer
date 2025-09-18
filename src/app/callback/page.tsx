"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/UserProfileI";
import axios from "axios";
import { SpotifyService } from "@/services/SpotifyService/SpotifyService";
import { PlaylistsI } from "@/types/PlaylistI";
import { PlaylistCard } from "@/components/PlaylistCard";

const spotifyService = SpotifyService.create();

export default function Home() {
  const [playlists, setPlaylists] = useState<PlaylistsI>({} as PlaylistsI);
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  const searchParams = useSearchParams();

  const [accessToken, setAccessToken] = useState<string>("");
  const [privateAccessToken, setPrivateAccessToken] = useState<string>("");

  console.log(playlists);

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
        spotifyService.setAccessToken(resJson.accessToken);
      }
    }

    getAccessToken();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;

      const res = await spotifyService.getUserProfile();

      if (res.success && res.data) {
        console.log(res.data);
        setProfile(res.data);
      }
    };

    if (accessToken.length) fetchProfile();
  }, [accessToken]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!profile || !profile.id) return;

      const res = await spotifyService.getPlaylistsByUserId(profile.id);

      if (res.success && res.data) {
        console.log(res.data);
        setPlaylists(res.data);

        const res2 = await spotifyService.getSongsByPlaylist(
          res.data.items[0].id
        );
        console.log(res2);
      }
    };

    if (accessToken.length) fetchPlaylists();
  }, [accessToken, profile]);

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

  if (profile.id) {
    return (
      <div className={styles.container}>
        <section className={styles.profile}>
          <div className={styles.profileWrapper}>
            <img
              className={styles.avatar}
              src={profile.images[0].url}
              alt="User avatar"
              width="120"
              height="120"
            />
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{profile.display_name}</h1>
              <ul className={styles.userDetails}>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email:</span>{" "}
                  <span id="email">{profile.email}</span>
                </li>
              </ul>
              <button
                onClick={() => createSpotifyPlaylist()}
                className={styles.createPlaylistButton}
              >
                Create New Playlist
              </button>
            </div>
          </div>
        </section>

        <section className={styles.playlists}>
          <h2 className={styles.sectionTitle}>Your Playlists</h2>
          <div className={styles.playlistGrid}>
            {playlists.items &&
              playlists.items.map((playlist) => {
                console.log(playlist);
                return <PlaylistCard key={playlist.id} playlist={playlist} />;
              })}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
