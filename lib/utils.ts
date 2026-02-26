import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChatSDKError, ErrorCode } from "./errors";
import { ChatMessage } from "@/types/chat";
import { UIMessagePart } from "ai";
import { Id } from "@/convex/_generated/dataModel";

export interface MessageRecord {
  id: string;
  role: "user" | "assistant" | "system";
  parts: UIMessagePart<any, any>[];
  source_message_id?: string;
  feedback?: {
    feedbackType: "positive" | "negative";
  } | null;
  fileDetails?: Array<{
    fileId: Id<"files">;
    name: string;
    url: string | null;
  }>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchWithErrorHandlers(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      // Try to parse a structured error response, but don't assume JSON is always present.
      let code: ErrorCode | undefined;
      let cause: string | undefined;

      try {
        const data = await response.clone().json();
        if (data && typeof data === "object") {
          if ("code" in data && typeof (data as any).code === "string") {
            code = (data as any).code as ErrorCode;
          }
          if ("cause" in data && typeof (data as any).cause === "string") {
            cause = (data as any).cause as string;
          }
        }
      } catch {
        try {
          const text = await response.text();
          if (text) {
            cause = text;
          }
        } catch {
          // Ignore parse errors; we'll fall back to a generic error message.
        }
      }

      // Fallback error code based on status when none was provided by the server.
      if (!code) {
        if (response.status === 401) {
          code = "unauthorized:api";
        } else if (response.status === 403) {
          code = "forbidden:api";
        } else if (response.status === 404) {
          code = "not_found:api";
        } else if (response.status === 429) {
          code = "rate_limit:api";
        } else if (response.status === 503) {
          code = "offline:api";
        } else {
          code = "bad_request:api";
        }
      }

      throw new ChatSDKError(code, cause);
    }

    return response;
  } catch (error: unknown) {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new ChatSDKError("offline:chat");
    }

    throw error;
  }
}

export function convertToUIMessages(messages: MessageRecord[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    // Sanitize parts: remove any old URLs that may be stored in database
    // URLs expire, so we always fetch fresh ones via fileId
    parts: message.parts.map((part: any) => {
      if (part.type === "file" && part.url) {
        const { url, ...partWithoutUrl } = part;
        return partWithoutUrl;
      }
      return part;
    }),
    sourceMessageId: message.source_message_id,
    metadata: message.feedback
      ? { feedbackType: message.feedback.feedbackType }
      : undefined,
    fileDetails: message.fileDetails,
  }));
}
