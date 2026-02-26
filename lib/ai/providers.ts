import { customProvider } from "ai";
import { xai } from "@ai-sdk/xai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const ollama = createOpenAICompatible({
  baseURL: "https://ollama.com/v1",
  apiKey: process.env.OLLAMA_API_KEY || "",
});

const opencode = createOpenAICompatible({
  baseURL: "https://opencode.ai/zen/v1",
  apiKey: process.env.OPENCODE_API_KEY || "",
});

const baseProviders = {
  "ask-model": openrouter("google/gemini-3-flash-preview"),
  "ask-model-free": xai("grok-4-1-fast-non-reasoning"),
  "ask-vision-model": openrouter("google/gemini-3-flash-preview"),
  "ask-vision-model-for-pdfs": openrouter("google/gemini-3-flash-preview"),
  "agent-model": openrouter("google/gemini-3-flash-preview"),
  "agent-vision-model": openrouter("google/gemini-3-flash-preview"),
  "fallback-agent-model": openrouter("google/gemini-3-flash-preview"),
  "fallback-ask-model": openrouter("moonshotai/kimi-k2.5"),
  "title-generator-model": openrouter("x-ai/grok-4.1-fast"),
  "summarization-model": openrouter("google/gemini-3-flash-preview"),
  "ollama-model": ollama("glm-5:cloud"),
  "opencode-model": opencode("minimax-m2.5-free"),
} as Record<string, any>;

export { baseProviders };

export type ModelName = keyof typeof baseProviders;

export const modelCutoffDates: Record<ModelName, string> = {
  "ask-model": "January 2025",
  "ask-model-free": "November 2024",
  "ask-vision-model": "January 2025",
  "ask-vision-model-for-pdfs": "January 2025",
  "agent-model": "January 2025",
  "agent-vision-model": "January 2025",
  "fallback-agent-model": "January 2025",
  "fallback-ask-model": "January 2025",
  "title-generator-model": "November 2024",
  "summarization-model": "January 2025",
  "ollama-model": "February 2025",
  "opencode-model": "February 2025",
};

export const getModelCutoffDate = (modelName: ModelName): string => {
  return modelCutoffDates[modelName];
};

export const myProvider = customProvider({
  languageModels: baseProviders,
});

export const createTrackedProvider = () => {
  return myProvider;
};
