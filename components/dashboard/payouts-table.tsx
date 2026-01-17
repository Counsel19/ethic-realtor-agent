"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownLeft, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Payout {
  id: string;
  amount: number;
  description: string;
  dateTime: string;
  property: {
    id: string;
    imageUrl: string;
    type: string;
    location: string;
  };
  status: "success" | "pending";
}

interface PayoutsTableProps {
  payouts: Payout[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  
  // Format: "12 Noon, 3rd Nov 2023"
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };
  
  return `${time}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

const statusConfig = {
  success: {
    label: "Success",
    className: "bg-green-100 text-green-700",
  },
  pending: {
    label: "Pending",
    className: "bg-orange-100 text-orange-700",
  },
};

export function PayoutsTable({ payouts }: PayoutsTableProps) {
  if (payouts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No payouts found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Transaction
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Property
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => {
            const status = statusConfig[payout.status];
            return (
              <tr
                key={payout.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <ArrowDownLeft className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(payout.amount)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {payout.description}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(payout.dateTime)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Link
                    href={`/dashboard/listings/${payout.property.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={payout.property.imageUrl}
                        alt={payout.property.type}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {payout.property.type}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{payout.property.location}</span>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
