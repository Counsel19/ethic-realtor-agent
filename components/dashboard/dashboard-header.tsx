"use client";

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  title?: string;
}

export function DashboardHeader({ title = "Dashboard" }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-border px-4 py-4 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-9 w-64"
            />
          </div>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-1 rounded-full bg-accent hover:bg-accent/80 transition-colors">
            <User className="h-5 w-5 text-accent-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
