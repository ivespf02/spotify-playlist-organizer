import { UserProfile } from "@/types/UserProfileI";

export interface SpotifyServiceI {
    getUserProfile(user_id: string): Promise<UserProfile>
    getSongsByUserId(user_id: string): Promise<any[]>;
    getPlaylistsByUserId(user_id: string): Promise<any[]>
    getSongsByPlaylist(user_id: string, playlist_id: string): Promise<any[]>
    addSongsToPlaylist(user_id: string, song_id: string, playlist_id: string): Promise<any>
    removeSongsFromPlaylist(user_id: string, song_id: string, playlist_id: string): Promise<any>
}