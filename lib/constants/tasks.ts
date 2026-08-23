import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const taskStatuses = [
  {
    value: "ACTIVE" as const,
    label: "Active",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "PENDING" as const,
    label: "Pending",
    icon: CircleIcon,
  },
  {
    value: "COMPLETE" as const,
    label: "Complete",
    icon: StopwatchIcon,
  },
];

export const taskPriorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Normal",
    value: "normal",
    icon: ArrowRightIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
  {
    label: "Critical",
    value: "critical",
    icon: ArrowUpIcon,
  },
];

export const priorityColors: Record<string, string> = {
  low: "text-green-500",
  normal: "text-yellow-500",
  medium: "text-orange-500",
  high: "text-red-500",
  critical: "text-rose-600",
};

export const priorityBadgeVariant: Record<string, string> = {
  low: "secondary",
  normal: "outline",
  medium: "outline",
  high: "destructive",
  critical: "destructive",
};

export function getPriorityColor(priority: string): string {
  return priorityColors[priority] ?? "text-slate-600";
}

export function getPriorityBadgeVariant(priority: string): string {
  return priorityBadgeVariant[priority] ?? "outline";
}

export const documentSystemTypes = [
  { value: "RECEIPT", label: "Receipt" },
  { value: "CONTRACT", label: "Contract" },
  { value: "OFFER", label: "Offer" },
  { value: "OTHER", label: "Other" },
];

export const processingStatuses = [
  { value: "PENDING", label: "Pending", icon: CircleIcon },
  { value: "PROCESSING", label: "Processing", icon: StopwatchIcon },
  { value: "READY", label: "Ready", icon: CheckCircledIcon },
  { value: "FAILED", label: "Failed", icon: CrossCircledIcon },
];
