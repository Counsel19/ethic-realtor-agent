"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  id: string;
  type: "review" | "payment";
  primaryMessage: string;
  secondaryMessage: string;
  linkText: string;
  linkHref: string;
  isRead?: boolean;
  className?: string;
}

export function NotificationCard({
  id,
  type,
  primaryMessage,
  secondaryMessage,
  linkText,
  linkHref,
  isRead = false,
  className,
}: NotificationCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors",
        !isRead && "bg-blue-50/50",
        className
      )}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <User className="h-5 w-5 text-blue-700" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">
          {primaryMessage}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {secondaryMessage}
        </p>
        <Link
          href={linkHref}
          className="text-sm text-primary hover:underline mt-2 inline-block"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}
