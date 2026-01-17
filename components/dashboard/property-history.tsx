"use client";

import Link from "next/link";
import { CheckCircle2, Clock, FileText, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryItem {
  stage: string;
  status: "done" | "awaiting" | "pending";
  link?: {
    label: string;
    href: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

interface PropertyHistoryProps {
  history: HistoryItem[];
  className?: string;
}

export function PropertyHistory({ history, className }: PropertyHistoryProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">Property history</h3>
      <div className="space-y-4">
        {history.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === history.length - 1;

          return (
            <div key={item.stage} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "rounded-full p-2",
                    item.status === "done"
                      ? "bg-green-100 text-green-700"
                      : item.status === "awaiting"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {!isLast && (
                  <div className="w-0.5 h-full bg-border min-h-[60px] mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <p className="text-sm font-medium text-foreground">
                  {item.stage}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.status === "done"
                    ? "DONE"
                    : item.status === "awaiting"
                    ? "AWAITING REVIEW"
                    : "PENDING"}
                </p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// History item icons
export const historyIcons = {
  check: CheckCircle2,
  clock: Clock,
  document: FileText,
  card: CreditCard,
};
