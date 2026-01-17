"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SupportWelcomeBannerProps {
  onTicketsClick?: () => void;
}

export function SupportWelcomeBanner({
  onTicketsClick,
}: SupportWelcomeBannerProps) {
  return (
    <div className="bg-primary text-white rounded-xl p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Welcome to Ethical Realtors Support
          </h2>
          <p className="text-white/80 text-sm lg:text-base">
            Have issues? Send us a message
          </p>
        </div>
        <Button
          onClick={onTicketsClick}
          variant="secondary"
          className="w-full lg:w-auto shrink-0 h-11"
          size="lg"
          asChild={!onTicketsClick}
        >
          {onTicketsClick ? (
            "Tickets"
          ) : (
            <Link href="/dashboard/support/tickets">Tickets</Link>
          )}
        </Button>
      </div>
    </div>
  );
}
