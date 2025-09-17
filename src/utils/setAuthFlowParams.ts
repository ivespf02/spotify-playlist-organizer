import generateCodeChallenge from "./generateCodeChallenge";
import generateCodeVerifier from "./generateCodeVerifier";

async function setAuthFlowParams(clientId: string, scope?: string): Promise<{ spotify_url: string | null, error?: string }> {
    if (!process.env.NEXT_PUBLIC_CALLBACK_URL) { 
        return {
            error: "Callback URL not defined",
            spotify_url: null
        }
    }

    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", process.env.NEXT_PUBLIC_CALLBACK_URL);
    params.append("scope", scope || "user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-modify user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    return {
        spotify_url: `https://accounts.spotify.com/authorize?${params.toString()}`
    }
}

export default setAuthFlowParams