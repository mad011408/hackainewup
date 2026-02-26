import { NextRequest, NextResponse } from "next/server";

export const POST = async () => {
  return NextResponse.json({
    subscription: "ultra",
    subscriptionId: "mock-subscription-id",
    plan: "ultra-monthly-plan",
    status: "active",
    currentPeriodEnd: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    cancelAtPeriodEnd: false,
  });
};

export const GET = async () => {
  return NextResponse.json({
    subscription: "ultra",
    subscriptionId: "mock-subscription-id",
    plan: "ultra-monthly-plan",
    status: "active",
    currentPeriodEnd: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    cancelAtPeriodEnd: false,
  });
};
