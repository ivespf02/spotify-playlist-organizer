"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { usePlaylistsStore } from "@/store/PlaylistsStore";
import { PlaylistI } from "@/types/PlaylistI";

export default function NewPlaylist() {
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<string[]>([]);
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    genre: "",
    artist: "",
    year: "",
    popularity: "",
    initialLetter: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]); 
  const { playlists } = usePlaylistsStore();

  const currentYear = 2025;

  const handleSearch = () => {
    setLoading(true);
    setTracks([]);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
        <h2 className={styles.sectionTitle}>Include your existing playlists</h2>
        <div className={styles.playlistGrid}>
          {playlists.items.map((playlist) => (
            <div
              onClick={() => {
                if (selectedPlaylistIds.includes(playlist.id)) {
                  setSelectedPlaylistIds(
                    selectedPlaylistIds.filter((each) => each !== playlist.id)
                  );
                } else {
                  setSelectedPlaylistIds([...selectedPlaylistIds, playlist.id]);
                }
              }}
              key={playlist.id}
              style={
                selectedPlaylistIds.includes(playlist.id)
                  ? { borderWidth: 2, borderColor: "green" }
                  : {}
              }
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

      <section className={styles.filters}>
        <h2 className={styles.sectionTitle}>Filter Tracks</h2>
        <div className={styles.filterGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="genre" className={styles.inputLabel}>Genre</label>
            <select
              id="genre"
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className={styles.inputField}
            >
              <option value="">All</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip Hop</option>
              <option value="electronic">Electronic</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
              <option value="r&b">R&B</option>
              <option value="country">Country</option>
              <option value="metal">Metal</option>
              <option value="folk">Folk</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="artist" className={styles.inputLabel}>Artist</label>
            <input
              id="artist"
              type="text"
              value={filters.artist}
              onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
              placeholder="Enter artist name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="year" className={styles.inputLabel}>Year</label>
            <select
              id="year"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className={styles.inputField}
            >
              <option value="">All</option>
              {Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="popularity" className={styles.inputLabel}>Popularity (0-100)</label>
            <select
              id="popularity"
              value={filters.popularity}
              onChange={(e) => setFilters({ ...filters, popularity: e.target.value })}
              className={styles.inputField}
            >
              <option value="">All</option>
              {Array.from({ length: 101 }, (_, i) => 100 - i).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Initial Letter</label>
            <div className={styles.letterButtons}>
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => setFilters({ ...filters, initialLetter: filters.initialLetter === letter ? "" : letter })}
                  className={`${styles.letterButton} ${filters.initialLetter === letter ? styles.active : ""}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="language" className={styles.inputLabel}>Language</label>
            <select
              id="language"
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className={styles.inputField}
            >
              <option value="">All</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
            </select>
          </div>
        </div>
        <button onClick={handleSearch} className={styles.submitButton}>Apply Filters</button>
      </section>

      <section className={styles.tracks}>
        <h2 className={styles.sectionTitle}>Tracks</h2>
        {loading ? (
          <div className={styles.loading}>
            <progress className={styles.progressBar} />
            <p>Loading tracks...</p>
          </div>
        ) : (
          <div className={styles.trackGrid}>
            {tracks.map((track) => (
              <div
                onClick={() => {
                  if (selectedTrackIds.includes(track.id)) {
                    setSelectedTrackIds(selectedTrackIds.filter((each) => each !== track.id));
                  } else {
                    setSelectedTrackIds([...selectedTrackIds, track.id]);
                  }
                }}
                key={track.id}
                style={
                  selectedTrackIds.includes(track.id)
                    ? { borderWidth: 2, borderColor: "green" }
                    : {}
                }
                className={styles.trackCard}
                role="button"
                tabIndex={0}
              >
                <img
                  src={track.album?.images[0]?.url || "#"}
                  alt={`${track.name} cover`}
                  className={styles.trackCover}
                />
                <div className={styles.trackInfo}>
                  <h3 className={styles.trackTitle}>{track.name}</h3>
                  <p className={styles.trackDesc}>
                    {track.artists?.map((a: any) => a.name).join(", ") || "Unknown artist"}
                  </p>
                </div>
              </div>
            ))}
            {tracks.length === 0 && <p>No tracks found.</p>}
          </div>
        )}
      </section>
    </div>
  );
}