import type { NextRequest } from "next/server";
import type { SubscriptionTier } from "@/types";

const MOCK_USER_ID = "mock-user-id";

export const getUserID = async (_req: NextRequest): Promise<string> => {
  return MOCK_USER_ID;
};

export const getUserIDAndPro = async (
  _req: NextRequest,
): Promise<{
  userId: string;
  subscription: SubscriptionTier;
}> => {
  return { userId: MOCK_USER_ID, subscription: "ultra" };
};

export const getUserIDWithFreshLogin = async (
  _req: NextRequest,
  _windowMs: number = 10 * 60 * 1000,
): Promise<string> => {
  return MOCK_USER_ID;
};
