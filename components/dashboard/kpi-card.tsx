import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  actionLabel: string;
  actionHref: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  actionLabel,
  actionHref,
  className,
}: KPICardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">{value}</p>
          </div>
          <Link
            href={actionHref}
            className="text-sm font-medium text-primary hover:underline shrink-0"
          >
            {actionLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
