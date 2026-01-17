"use client";

import Link from "next/link";
import { HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "danger";
}

interface ProfileSettingsProps {
  settings: SettingItem[];
  className?: string;
}

export function ProfileSettings({ settings, className }: ProfileSettingsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">Settings</h3>
      <div className="space-y-2">
        {settings.map((setting, index) => {
          const Icon = setting.icon;
          const isDanger = setting.variant === "danger";
          
          const content = (
            <div
              className={cn(
                "flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
                isDanger && "border-red-200 hover:bg-red-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isDanger ? "text-red-600" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    isDanger ? "text-red-600" : "text-foreground"
                  )}
                >
                  {setting.label}
                </span>
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4",
                  isDanger ? "text-red-600" : "text-muted-foreground"
                )}
              />
            </div>
          );

          if (setting.onClick) {
            return (
              <button
                key={index}
                onClick={setting.onClick}
                className="w-full text-left"
              >
                {content}
              </button>
            );
          }

          if (setting.href) {
            return (
              <Link key={index} href={setting.href} className="block">
                {content}
              </Link>
            );
          }

          return <div key={index}>{content}</div>;
        })}
      </div>
    </div>
  );
}
