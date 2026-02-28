export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID ?? "";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  // Build URL safely: if a valid oauthPortalUrl is provided, use it;
  // otherwise fall back to a relative /app-auth on the current origin.
  try {
    if (oauthPortalUrl) {
      // Attempt to construct using the provided portal URL.
      const base = new URL(oauthPortalUrl);
      const url = new URL("/app-auth", base);
      url.searchParams.set("appId", appId);
      url.searchParams.set("redirectUri", redirectUri);
      url.searchParams.set("state", state);
      url.searchParams.set("type", "signIn");
      return url.toString();
    }
  } catch (e) {
    // If oauthPortalUrl is malformed, fall through to fallback.
  }

  // Fallback: use current origin so calls don't throw in environments
  // where VITE_OAUTH_PORTAL_URL isn't configured (e.g., local dev).
  const fallback = new URL("/app-auth", window.location.origin);
  fallback.searchParams.set("appId", appId);
  fallback.searchParams.set("redirectUri", redirectUri);
  fallback.searchParams.set("state", state);
  fallback.searchParams.set("type", "signIn");
  return fallback.toString();
};
