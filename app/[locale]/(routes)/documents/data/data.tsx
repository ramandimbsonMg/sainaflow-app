export { documentSystemTypes, processingStatuses } from "@/lib/constants/tasks";

export const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];

// Keep legacy exports for any remaining references
export const statuses = processingStatuses;
export const priorities = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];
