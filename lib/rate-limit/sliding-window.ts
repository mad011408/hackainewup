/**
 * Sliding Window Rate Limiting (Free Users)
 *
 * Simple request counting within a 5-hour rolling window.
 * Used only for free users - paid users use token bucket (cost-based).
 */

import { Ratelimit } from "@upstash/ratelimit";
import { ChatSDKError } from "@/lib/errors";
import type { RateLimitInfo } from "@/types";
import { createRedisClient, formatTimeRemaining } from "./redis";

/**
 * Check rate limit for free users using sliding window.
 * Simple request counting within a 5-hour rolling window.
 */
export const checkFreeUserRateLimit = async (
  userId: string,
): Promise<RateLimitInfo> => {
  const redis = createRedisClient();

  // If Redis is not configured, allow unlimited requests (dev mode)
  if (!redis) {
    return {
      allowed: true,
      remaining: 999999,
      resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      limit: 999999,
      session: {
        remaining: 999999,
        limit: 999999,
        resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      weekly: {
        remaining: 999999,
        limit: 999999,
        resetTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      pointsDeducted: 0,
    };
  }

  const requestLimit = parseInt(process.env.FREE_RATE_LIMIT_REQUESTS || "10");

  try {
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requestLimit, "5 h"),
      prefix: "free_limit",
    });

    const rateLimitKey = `${userId}:free`;
    const { success, reset, remaining } = await ratelimit.limit(rateLimitKey);

    if (!success) {
      const timeString = formatTimeRemaining(new Date(reset));
      throw new ChatSDKError(
        "rate_limit:chat",
        `You've reached your rate limit, please try again after ${timeString}.\n\nUpgrade plan for higher usage limits and more features.`,
      );
    }

    return {
      allowed: true,
      remaining,
      resetTime: new Date(reset),
      limit: requestLimit,
    };
  } catch (error) {
    if (error instanceof ChatSDKError) throw error;
    throw new ChatSDKError(
      "rate_limit:chat",
      `Rate limiting service unavailable: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
