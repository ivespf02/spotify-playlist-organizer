async function getAccessToken(clientId: string, code: string): Promise<{ access_token: string | null, error?: string }> {
    if (!process.env.CALLBACK_URL) { 
        return {
            error: "Callback URL not defined",
            access_token: null
        }
    }

    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.CALLBACK_URL || "");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return {
        access_token
    };
}

export default getAccessToken