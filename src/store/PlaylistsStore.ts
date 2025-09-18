import { PlaylistsI } from "@/types/PlaylistI";
import { create } from "zustand";

type PlaylistsState = {
  playlists: PlaylistsI;
  setPlaylists: (playlist: PlaylistsI) => void;
  setAllPlaylists: (playlists: PlaylistsI) => void;
  clearPlaylists: () => void;
};

export const usePlaylistsStore = create<PlaylistsState>((set) => ({
  playlists: {} as PlaylistsI,

  setPlaylists: (playlists) =>
    set((state) => ({
      playlists: playlists,
    })),

  setAllPlaylists: (playlists) => set({ playlists }),

  clearPlaylists: () => set({ playlists: {} as PlaylistsI }),
}));
