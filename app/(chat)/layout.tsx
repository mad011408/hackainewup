"use client";

import { ChatLayout } from "@/app/components/ChatLayout";

/**
 * Shared layout for / and /c/[id]. Renders the Chat Sidebar.
 */
export default function ChatRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh min-h-0 flex flex-col bg-background overflow-hidden">
      <ChatLayout>{children}</ChatLayout>
    </div>
  );
}
