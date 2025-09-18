"use client"
import { PlaylistsI } from "@/types/PlaylistI";
import styles from "./page.module.css";
import { usePlaylistsStore } from "@/store/PlaylistsStore";

export default function NewPlaylist() {
  const { playlists } = usePlaylistsStore()

  return (
    <div className={styles.container}>
      <section className={styles.createPlaylist}>
        <h1 className={styles.pageTitle}>Create a New Playlist</h1>
        <div className={styles.formWrapper}>
          <div className={styles.inputGroup}>
            <label htmlFor="playlistName" className={styles.inputLabel}>
              Playlist Name
            </label>
            <input
              type="text"
              id="playlistName"
              placeholder="Enter playlist name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="playlistDescription" className={styles.inputLabel}>
              Description
            </label>
            <textarea
              id="playlistDescription"
              placeholder="Describe your playlist"
              className={styles.textareaField}
            />
          </div>
          <button className={styles.submitButton}>Create Playlist</button>
        </div>
      </section>

      <section className={styles.playlists}>
        <h2 className={styles.sectionTitle}>Your Existing Playlists</h2>
        <div className={styles.playlistGrid}>
          {playlists.items.map((playlist) => (
            <div
              key={playlist.id}
              className={styles.playlistCard}
              role="button"
              tabIndex={0}
            >
              <img
                src={playlist.images[1].url || "#"}
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
          ))}
        </div>
      </section>
    </div>
  );
}
