"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface CustomizeHackerAIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const predefinedTraits = [
  "Methodical",
  "Detail-oriented",
  "Thorough",
  "Risk-aware",
  "Tool-savvy",
];

const personalityOptions = [
  { value: "default", label: "Default", description: "" },
  { value: "cynic", label: "Cynic", description: "Critical and sarcastic" },
  { value: "robot", label: "Robot", description: "Efficient and blunt" },
  {
    value: "listener",
    label: "Listener",
    description: "Thoughtful and supportive",
  },
  { value: "nerd", label: "Nerd", description: "Exploratory and enthusiastic" },
];

export const CustomizeHackerAIDialog = ({
  open,
  onOpenChange,
}: CustomizeHackerAIDialogProps) => {
  const [nickname, setNickname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [personality, setPersonality] = useState("default");
  const [traitsText, setTraitsText] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const MAX_CHAR_LIMIT = 1500;

  const isNicknameOverLimit = nickname.length > MAX_CHAR_LIMIT;
  const isOccupationOverLimit = occupation.length > MAX_CHAR_LIMIT;
  const isTraitsOverLimit = traitsText.length > MAX_CHAR_LIMIT;
  const isAdditionalInfoOverLimit = additionalInfo.length > MAX_CHAR_LIMIT;
  const isSystemPromptOverLimit = systemPrompt.length > MAX_CHAR_LIMIT;

  const saveCustomization = useMutation(
    api.userCustomization.saveUserCustomization,
  );
  const userCustomization = useQuery(
    api.userCustomization.getUserCustomization,
    open ? {} : "skip",
  );

  // Load existing customization data
  useEffect(() => {
    if (userCustomization) {
      setNickname(userCustomization.nickname || "");
      setOccupation(userCustomization.occupation || "");
      setPersonality(userCustomization.personality || "default");
      setTraitsText(userCustomization.traits || "");
      setAdditionalInfo(userCustomization.additional_info || "");
    }
    // Also load system prompt from localStorage (works without database)
    setSystemPrompt(localStorage.getItem("system_prompt") || "");
  }, [userCustomization]);

  const handleAddTrait = (trait: string) => {
    if (trait) {
      const currentText = traitsText.trim();
      const newText = currentText ? `${currentText}, ${trait}` : trait;
      setTraitsText(newText);
    }
  };

  const handleSave = async () => {
    // Check for character limit violations
    if (
      isNicknameOverLimit ||
      isOccupationOverLimit ||
      isTraitsOverLimit ||
      isAdditionalInfoOverLimit ||
      isSystemPromptOverLimit
    ) {
      return; // Don't save if any field exceeds the limit
    }

    try {
      setIsSaving(true);

      // Save to database (may fail in dev mode without database)
      try {
        await saveCustomization({
          nickname: nickname || undefined,
          occupation: occupation || undefined,
          personality: personality === "default" ? undefined : personality,
          traits: traitsText.trim() || undefined,
          additional_info: additionalInfo || undefined,
        });
      } catch (dbError) {
        // Ignore database errors in dev mode - localStorage will work
        console.warn("Database save failed (expected in dev mode):", dbError);
      }

      // Always save system prompt to localStorage (works without database)
      try {
        localStorage.setItem("system_prompt", systemPrompt);
      } catch (e) {
        console.warn("Failed to save system prompt to localStorage:", e);
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save customization:", error);
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message?: string })?.message ||
            error.message ||
            "Failed to save customization"
          : error instanceof Error
            ? error.message
            : "Failed to save customization";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (userCustomization) {
      setNickname(userCustomization.nickname || "");
      setOccupation(userCustomization.occupation || "");
      setPersonality(userCustomization.personality || "default");
      setTraitsText(userCustomization.traits || "");
      setAdditionalInfo(userCustomization.additional_info || "");
    } else {
      // Reset to empty values if no existing customization
      setNickname("");
      setOccupation("");
      setPersonality("default");
      setTraitsText("");
      setAdditionalInfo("");
    }
    // Reset system prompt to saved value
    setSystemPrompt(localStorage.getItem("system_prompt") || "");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Personalization</DialogTitle>
          <DialogDescription>
            Introduce yourself to get better, more personalized responses
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pb-3">
          <div className="space-y-5 pb-3">
            {/* Nickname */}
            <div className="flex flex-col gap-2 px-1">
              <Label htmlFor="nickname">What should HackerAI call you?</Label>
              <TextareaAutosize
                id="nickname"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={`flex w-full rounded-md border ${isNicknameOverLimit ? "border-red-500" : "border-input"} bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                maxRows={1}
              />
              {isNicknameOverLimit && (
                <div className="text-xs text-red-500 mt-1">
                  {nickname.length}/{MAX_CHAR_LIMIT} characters
                </div>
              )}
            </div>

            {/* Occupation */}
            <div className="flex flex-col gap-2 px-1">
              <Label htmlFor="occupation">What do you do?</Label>
              <TextareaAutosize
                id="occupation"
                placeholder="Pentester, bug bounty hunter, etc."
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className={`flex w-full rounded-md border ${isOccupationOverLimit ? "border-red-500" : "border-input"} bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                maxRows={1}
              />
              {isOccupationOverLimit && (
                <div className="text-xs text-red-500 mt-1">
                  {occupation.length}/{MAX_CHAR_LIMIT} characters
                </div>
              )}
            </div>

            {/* Personality */}
            <div className="flex flex-col gap-2 px-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Label className="sm:flex-shrink-0">
                  What personality should HackerAI have?
                </Label>
                <Select value={personality} onValueChange={setPersonality}>
                  <SelectTrigger className="w-full sm:w-auto">
                    <SelectValue placeholder="Select personality">
                      {
                        personalityOptions.find(
                          (opt) => opt.value === personality,
                        )?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {personalityOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="flex flex-col items-start py-3"
                      >
                        <div className="flex flex-col">
                          <div className="font-medium">{option.label}</div>
                          {option.value !== "default" && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Traits */}
            <div className="flex flex-col gap-2 px-1">
              <Label>What traits should HackerAI have?</Label>

              <TextareaAutosize
                placeholder="Describe or select traits"
                value={traitsText}
                onChange={(e) => setTraitsText(e.target.value)}
                className={`flex w-full rounded-md border ${isTraitsOverLimit ? "border-red-500" : "border-input"} bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                minRows={2}
                maxRows={4}
              />
              {isTraitsOverLimit && (
                <div className="text-xs text-red-500 mt-1">
                  {traitsText.length}/{MAX_CHAR_LIMIT} characters
                </div>
              )}

              {/* Predefined traits */}
              <div className="flex flex-wrap gap-2 mt-2">
                {predefinedTraits.map((trait) => (
                  <button
                    key={trait}
                    type="button"
                    onClick={() => handleAddTrait(trait)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm border rounded-full hover:bg-muted transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    {trait}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-col gap-3 px-1">
              <Label htmlFor="additional-info">
                Anything else HackerAI should know about you?
              </Label>
              <TextareaAutosize
                id="additional-info"
                placeholder="Security interests, preferred methodologies, compliance requirements"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className={`flex w-full rounded-md border ${isAdditionalInfoOverLimit ? "border-red-500" : "border-input"} bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                minRows={3}
                maxRows={6}
              />
              {isAdditionalInfoOverLimit && (
                <div className="text-xs text-red-500 mt-1">
                  {additionalInfo.length}/{MAX_CHAR_LIMIT} characters
                </div>
              )}
            </div>

            {/* System Prompt */}
            <div className="flex flex-col gap-3 px-1 mt-4 border-t pt-4">
              <Label htmlFor="system-prompt">
                Custom System Prompt
              </Label>
              <TextareaAutosize
                id="system-prompt"
                placeholder="You are a helpful security assistant..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className={`flex w-full rounded-md border ${isSystemPromptOverLimit ? "border-red-500" : "border-input"} bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none`}
                minRows={3}
                maxRows={8}
              />
              {isSystemPromptOverLimit && (
                <div className="text-xs text-red-500 mt-1">
                  {systemPrompt.length}/{MAX_CHAR_LIMIT} characters
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                This will be added to every conversation as system instructions.
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              isSaving ||
              isNicknameOverLimit ||
              isOccupationOverLimit ||
              isTraitsOverLimit ||
              isAdditionalInfoOverLimit ||
              isSystemPromptOverLimit
            }
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
