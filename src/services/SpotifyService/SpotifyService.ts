import { UserProfile } from "@/types/UserProfileI";
import { SpotifyServiceI } from "./SpotifyServiceI";
import axios from "axios";
import { Playlists } from "@/types/PlaylistI";

export class SpotifyService implements SpotifyServiceI {
  private accessToken?: string;

  private constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }

  public static create(accessToken?: string) {
    return new SpotifyService(accessToken);
  }

  public setAccessToken(newToken: string) {
    this.accessToken = newToken;
  }

  public async getUserProfile(): Promise<{
    success: boolean;
    data: UserProfile | null;
  }> {
    const url = "https://api.spotify.com/v1/me";
    console.log(this.accessToken)
    const { data }: { data: UserProfile } = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + this.accessToken,
      },
    });

    if (data) {
      return {
        success: true,
        data: data,
      };
    }

    return {
      success: false,
      data: null,
    };
  }

  public async getPlaylistsByUserId(user_id: string): Promise<{
    success: boolean;
    data: Playlists | null;
  }> {
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    
    const { data }: { data: Playlists } = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + this.accessToken,
      },
    });

    if (data) {
      return {
        success: true,
        data: data,
      };
    }

    return {
      success: false,
      data: null,
    };
  }

  public async getSongsByUserId(user_id: string): Promise<any[]> {
    return [];
  }

  public async getSongsByPlaylist(
    playlist_id: string
  ): Promise<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    
    const { data }: { data: Playlists } = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + this.accessToken,
      },
    });

    if (data) {
        console.log(data)
      return {
        success: true,
        data: data,
      };
    }

    return {
      success: false,
      data: null,
    };
    return [];
  }

  public async addSongsToPlaylist(
    user_id: string,
    song_id: string,
    playlist_id: string
  ): Promise<any> {
    return "";
  }

  public async removeSongsFromPlaylist(
    user_id: string,
    song_id: string,
    playlist_id: string
  ): Promise<any> {
    return "";
  }
}
