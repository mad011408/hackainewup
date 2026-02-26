import { ConvexHttpClient } from "convex/browser";

// Lazy singleton to avoid build-time crash when NEXT_PUBLIC_CONVEX_URL is not set
let _client: ConvexHttpClient | null = null;

export function getConvexClient(): ConvexHttpClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error(
        "NEXT_PUBLIC_CONVEX_URL environment variable is not set",
      );
    }
    _client = new ConvexHttpClient(url);
  }
  return _client;
}
