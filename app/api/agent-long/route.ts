import { tasks } from "@trigger.dev/sdk/v3";
import type { agentStreamTask } from "@/src/trigger/agent-task";
import { prepareAgentPayload } from "@/lib/api/prepare-agent-payload";
import { ChatSDKError } from "@/lib/errors";
import PostHogClient from "@/app/posthog";
import type { NextRequest } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // Provide a clear, structured error when Trigger.dev is not configured locally
    // instead of allowing a low-level ApiClientMissingError to bubble up.
    if (!process.env.TRIGGER_SECRET_KEY) {
      throw new ChatSDKError(
        "forbidden:api",
        "TRIGGER_SECRET_KEY is not configured. Agent-Long mode requires Trigger.dev to be set up.",
      );
    }

    const payload = await prepareAgentPayload(req);

    const handle = await tasks.trigger<typeof agentStreamTask>(
      "agent-stream",
      payload,
      {
        publicTokenOptions: { expirationTime: "1hr" },
      } as Parameters<typeof tasks.trigger>[2],
    );

    const posthog = PostHogClient();
    if (posthog) {
      posthog.capture({
        distinctId: payload.userId,
        event: "hackerai-agent-long",
        properties: {
          regenerate: payload.regenerate,
          ...(payload.subscription && { subscription: payload.subscription }),
        },
      });
      await posthog.flush();
    }

    return Response.json({
      runId: handle.id,
      publicAccessToken: handle.publicAccessToken,
    });
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    throw error;
  }
}
