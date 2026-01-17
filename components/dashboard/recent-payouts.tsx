import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Payout {
  id: string;
  amount: number;
  expectedDate: string;
  timestamp: string;
  status: string;
}

interface RecentPayoutsProps {
  payouts?: Payout[];
  headerAction?: {
    label: string;
    href: string;
  };
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateStr = formatDate(dateString);
  return `${time} ${dateStr}`;
};

export function RecentPayouts({
  payouts = [
    {
      id: "1",
      amount: 2000000,
      expectedDate: "2024-11-25",
      timestamp: "2024-11-23T12:12:00",
      status: "Part payment",
    },
    {
      id: "2",
      amount: 2000000,
      expectedDate: "2024-11-25",
      timestamp: "2024-11-23T12:12:00",
      status: "Part payment",
    },
    {
      id: "3",
      amount: 2000000,
      expectedDate: "2024-11-25",
      timestamp: "2024-11-23T12:12:00",
      status: "Part payment",
    },
  ],
  headerAction,
}: RecentPayoutsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Payouts</CardTitle>
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
        <div className="space-y-4">
          {payouts.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col items-baseline gap-2 flex-wrap">
                    <span className="text-lg font-semibold text-foreground">
                      {formatCurrency(payout.amount)}
                    </span>
                    <span className="text-sm text-green-500">
                      Expected payout {formatDate(payout.expectedDate)}
                    </span>
                  </div>
                  <Link
                    href={`/dashboard/payouts/${payout.id}`}
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                  >
                    See details
                  </Link>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-sm text-muted-foreground">
                  {formatDateTime(payout.timestamp)}
                </div>
                <div className="text-sm font-medium text-foreground mt-1">
                  {payout.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
