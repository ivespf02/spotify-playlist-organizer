import { Playlists } from "@/types/PlaylistI";
import { UserProfile } from "@/types/UserProfileI";

export interface SpotifyServiceI {
    getUserProfile(): Promise<{
        "success": boolean;
        data: UserProfile | null
    }>
    
    getSongsByUserId(user_id: string): Promise<any[]>;
    getPlaylistsByUserId(user_id: string): Promise<{
        "success": boolean;
        data: Playlists | null
    }>
    getSongsByPlaylist(playlist_id: string): Promise<any>
    addSongsToPlaylist(user_id: string, song_id: string, playlist_id: string): Promise<any>
    removeSongsFromPlaylist(user_id: string, song_id: string, playlist_id: string): Promise<any>
}