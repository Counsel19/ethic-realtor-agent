"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Listing {
  id: string;
  propertyType: string;
  location: string;
  price: number;
  status: "verification-pending" | "verified" | "sold";
  imageUrl: string;
}

interface ListingsTableProps {
  listings: Listing[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const statusConfig = {
  "verification-pending": {
    label: "Verification pending",
    className: "bg-orange-100 text-orange-700",
  },
  verified: {
    label: "Verified",
    className: "bg-green-100 text-green-700",
  },
  sold: {
    label: "Sold",
    className: "bg-blue-100 text-blue-700",
  },
};

export function ListingsTable({ listings }: ListingsTableProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No listings found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Property
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Price (NGN)
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => {
            const status = statusConfig[listing.status];
            return (
              <tr
                key={listing.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <Link
                    href={`/dashboard/listings/${listing.id}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={listing.imageUrl}
                        alt={listing.propertyType}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {listing.propertyType}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{listing.location}</span>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(listing.price)}
                  </span>
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
