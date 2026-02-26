"use client";

import { useGlobalState } from "../contexts/GlobalState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bot } from "lucide-react";
import { useEffect, useState } from "react";

const MODELS = [
  { id: "ask-model", name: "Gemini Flash", description: "Fast & reliable" },
  { id: "ask-model-free", name: "Grok", description: "Free tier" },
  { id: "ollama-model", name: "GLM-5 (Ollama)", description: "Fast cloud AI" },
  { id: "opencode-model", name: "MiniMax M2.5", description: "Free fast AI" },
  { id: "agent-model", name: "Agent Mode", description: "For complex tasks" },
];

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useGlobalState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 h-9 px-3 text-xs text-muted-foreground"
        disabled
      >
        <Bot className="w-4 h-4" />
        <span className="hidden sm:inline">Loading...</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 h-9 px-3 text-xs text-muted-foreground hover:text-foreground"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">{currentModel.name}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className="flex flex-col items-start gap-0.5 py-2"
          >
            <span className="font-medium">{model.name}</span>
            <span className="text-xs text-muted-foreground">
              {model.description}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
