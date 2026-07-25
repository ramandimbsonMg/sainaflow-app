"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ showText = true, size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon */}
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-[#4F46E5]",
          iconSizes[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn("text-white", size === "sm" ? "h-4 w-4" : "h-5 w-5")}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span
          className={cn(
            "font-heading font-bold tracking-tight",
            sizeClasses[size]
          )}
        >
          <span className="text-gray-900 dark:text-white">Saina</span>
          <span className="text-brand-500">Flow</span>
        </span>
      )}
    </Link>
  );
}
