import { Image } from "./ImageI";

export interface PlaylistI {
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

export interface PlaylistsI {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistI[];
}
