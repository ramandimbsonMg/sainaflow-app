"use client";

import { useState } from "react";
import { Brain, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TaskAIAssistantProps {
  description: string;
  onSuggestion?: (suggestion: string) => void;
  className?: string;
}

export function TaskAIAssistant({
  description,
  onSuggestion,
  className,
}: TaskAIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImproveDescription = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const response = await fetch("/api/ai/improve-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Failed to get suggestion");
      }

      const data = await response.json();
      setSuggestion(data.improvedDescription);
    } catch (err) {
      setError("Failed to generate suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuggestion = () => {
    if (suggestion && onSuggestion) {
      onSuggestion(suggestion);
      setSuggestion(null);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-500/10">
          <Brain className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          AI Assistant
        </span>
        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
      </div>

      {/* Content */}
      <div className="p-4">
        {!suggestion ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Improve this task description to make it clearer and more
              actionable.
            </p>
            <Button
              onClick={handleImproveDescription}
              disabled={isLoading || !description}
              className="bg-violet-500 hover:bg-violet-600 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Improve Description
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20">
              <Textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="min-h-[100px] border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleApplySuggestion}
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                Apply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSuggestion(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
