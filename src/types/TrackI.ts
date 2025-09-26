export interface TrackI {
    album: {
        name: string;
        total_tracks: number;
        release_date: string;
        id: string;
    },
    artists: string[];
    duration_ms: number;
    id: string;
    name: string;
    popularity: number;
}
