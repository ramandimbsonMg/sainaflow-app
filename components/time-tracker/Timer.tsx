"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, Square, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimerProps {
  taskId: string;
  onTimerComplete?: (entryId: string, duration: number) => void;
  className?: string;
}

export function Timer({ taskId, onTimerComplete, className }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [entryId, setEntryId] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleStart = async () => {
    try {
      const response = await fetch("/api/time-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, action: "start" }),
      });
      const data = await response.json();
      setEntryId(data.id);
      setIsRunning(true);
    } catch (error) {
      console.error("Failed to start timer:", error);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleStop = async () => {
    setIsRunning(false);
    if (entryId) {
      try {
        await fetch("/api/time-entries", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entryId, action: "stop" }),
        });
        onTimerComplete?.(entryId, elapsed);
        setEntryId(null);
        setElapsed(0);
      } catch (error) {
        console.error("Failed to stop timer:", error);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Clock
          className={cn(
            "h-4 w-4",
            isRunning ? "text-rose-500 animate-pulse" : "text-gray-400"
          )}
        />
        <span
          className={cn(
            "font-mono text-lg font-semibold tabular-nums",
            isRunning ? "text-rose-500" : "text-gray-700 dark:text-gray-300"
          )}
        >
          {formatTime(elapsed)}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {!isRunning && !entryId && (
          <Button
            size="sm"
            onClick={handleStart}
            className="h-8 px-3 bg-brand-500 hover:bg-brand-600 text-white"
          >
            <Play className="h-3.5 w-3.5 mr-1" />
            Start
          </Button>
        )}

        {isRunning && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handlePause}
              className="h-8 px-3"
            >
              <Pause className="h-3.5 w-3.5 mr-1" />
              Pause
            </Button>
            <Button
              size="sm"
              onClick={handleStop}
              className="h-8 px-3 bg-rose-500 hover:bg-rose-600 text-white"
            >
              <Square className="h-3.5 w-3.5 mr-1" />
              Stop
            </Button>
          </>
        )}

        {!isRunning && entryId && (
          <>
            <Button
              size="sm"
              onClick={handleResume}
              className="h-8 px-3 bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              Resume
            </Button>
            <Button
              size="sm"
              onClick={handleStop}
              className="h-8 px-3 bg-rose-500 hover:bg-rose-600 text-white"
            >
              <Square className="h-3.5 w-3.5 mr-1" />
              Stop
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
