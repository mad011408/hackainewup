import { NextRequest, NextResponse } from "next/server";

export const POST = async () => {
  return NextResponse.json({
    url: "/chat?refresh=entitlements",
    message: "Already on Ultra plan",
  });
};
