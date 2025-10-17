// Resolve API base URL from Expo public env var.
// This lets real devices hit dev/prod endpoints over HTTPS (no localhost).
// If EXPO_PUBLIC_API_URL is not set, we temporarily fall back to the existing Render URL.
// TODO: Remove fallback once staging/production domains are live.

const normalizeBaseUrl = (url) => {
	if (!url || typeof url !== "string") return null;
	// Trim trailing slashes
	const trimmed = url.replace(/\/+$/, "");
	// Ensure it ends with /api
	if (trimmed.toLowerCase().endsWith("/api")) return trimmed;
	return `${trimmed}/api`;
};

const fromEnv = normalizeBaseUrl(process.env.EXPO_PUBLIC_API_URL);

export const API_URL = fromEnv || "https://helloworld-5aei.onrender.com/api";

if (!fromEnv) {
	console.warn(
		"[api] EXPO_PUBLIC_API_URL not set; using temporary fallback Render URL."
	);
}