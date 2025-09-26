import { UserProfileI } from "@/types/UserProfileI";
import { SpotifyServiceI } from "./SpotifyServiceI";
import axios from "axios";
import { PlaylistsI } from "@/types/PlaylistI";

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
    data: UserProfileI | null;
  }> {
    const url = "https://api.spotify.com/v1/me";
    console.log(this.accessToken);
    const { data }: { data: UserProfileI } = await axios.get(url, {
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
    data: PlaylistsI | null;
  }> {
    try {
      const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

      const { data }: { data: PlaylistsI } = await axios.get(url, {
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
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
      };
    }
  }

  public async getSongsByUserId(user_id: string): Promise<any[]> {
    return [];
  }

  public async getSongsByPlaylist(playlist_id: string): Promise<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    let accumulatedData: PlaylistsI;

    async function getSongs(urlToAccess: string, accessToken?: string) {
      if (!accessToken) {
        return {
          success: false,
          data: null,
        };
      }
      
      console.log(`Making call number 1`);
      const { data }: { data: PlaylistsI } = await axios.get(urlToAccess, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (data) {
        if (!accumulatedData) {
          accumulatedData = data;
        } else {
          accumulatedData = {
            ...accumulatedData,
            items: [...accumulatedData?.items, ...data.items],
          };
        }

        if (data.next) {
          await getSongs(data.next, accessToken);
        } else {
          return {
            success: true,
            data: accumulatedData,
          };
        }
      } else {
        return {
          success: false,
          data: null,
        };
      }

      return {
          success: true,
          data: accumulatedData,
        };
    }

    const res = await getSongs(url, this.accessToken);

    return res;
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
