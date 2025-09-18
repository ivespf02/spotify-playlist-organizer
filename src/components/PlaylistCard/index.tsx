"use client";
import { Playlist } from "@/types/PlaylistI";
import styles from "./component.module.css";

export const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <div key={playlist.id} className={styles.playlistCard}>
      <img
        src={playlist.images[1]?.url ?? ""}
        alt={`${playlist.name} cover`}
        className={styles.playlistCover}
      />
      <div className={styles.playlistInfo}>
        <h3 className={styles.playlistTitle}>{playlist.name}</h3>
        <p className={styles.playlistDesc}>
          {playlist.description || "No description available"}
        </p>
      </div>
    </div>
  );
};
