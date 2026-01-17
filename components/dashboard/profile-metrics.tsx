"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Metric {
  title: string;
  value: string | number;
  actionLabel: string;
  actionHref: string;
}

interface ProfileMetricsProps {
  metrics: Metric[];
  className?: string;
}

export function ProfileMetrics({ metrics, className }: ProfileMetricsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </p>
              <p className="text-4xl lg:text-5xl font-bold text-primary">
                {metric.value}
              </p>
              <Link
                href={metric.actionHref}
                className="text-sm font-medium text-primary hover:underline"
              >
                {metric.actionLabel}
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
