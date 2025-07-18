"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  description,
  className,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between p-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] animate-fade-in",
        className
      )}
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {trend && (
          <p
            className={cn(
              "mt-1 text-xs font-medium",
              trendUp
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          >
            {trendUp ? "+" : ""}
            {trend}
          </p>
        )}
        {description && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {description}
          </p>
        )}
      </div>
      <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-500/10">
        <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
      </div>
    </div>
  );
}
