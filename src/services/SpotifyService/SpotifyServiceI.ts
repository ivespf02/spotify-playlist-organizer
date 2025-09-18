import { PlaylistsI } from "@/types/PlaylistI";
import { UserProfileI } from "@/types/UserProfileI";

export interface SpotifyServiceI {
    getUserProfile(): Promise<{
        "success": boolean;
        data: UserProfileI | null
    }>
    
    getSongsByUserId(user_id: string): Promise<any[]>;
    getPlaylistsByUserId(user_id: string): Promise<{
        "success": boolean;
        data: PlaylistsI | null
    }>
    getSongsByPlaylist(playlist_id: string): Promise<any>
    addSongsToPlaylist(user_id: string, song_id: string, playlist_id: string): Promise<any>
    removeSongsFromPlaylist(user_id: string, song_id: string, playlist_id: string): Promise<any>
}