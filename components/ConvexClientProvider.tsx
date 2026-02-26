"use client";

import { ReactNode } from "react";
import { ConvexProvider } from "convex/react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider>
      {children}
    </ConvexProvider>
  );
}
