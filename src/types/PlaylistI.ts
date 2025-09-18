import { Image } from "./ImageI";

export interface Playlist {
  collaborative: boolean;
  description: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: string;
  public: boolean;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
}
