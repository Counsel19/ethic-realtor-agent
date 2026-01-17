import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: "calendar" | "file";
  className?: string;
  headerAction?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
  className,
  headerAction,
}: EmptyStateProps) {

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {headerAction && (
            <CardAction>
              <Link
                href={headerAction.href}
                className="text-sm font-medium text-primary hover:underline"
              >
                {headerAction.label}
              </Link>
            </CardAction>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">
          <div className="mb-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-200/30 rounded-full blur-xl" />
              <div className="relative bg-green-50 rounded-2xl p-6">

                <Image src="/assets/empty_state.svg" className="h-24 w-24" alt="Empty State" width={64} height={64} />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{message}</p>
          {actionHref ? (
            <Link
              href={actionHref}
              className="text-sm font-medium text-primary hover:underline"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="text-sm font-medium text-primary hover:underline"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
