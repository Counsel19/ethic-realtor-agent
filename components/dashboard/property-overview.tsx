"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyOverviewProps {
  title: string;
  price: number;
  status: "verification-pending" | "verified" | "sold";
  location: string;
  description: string;
  mainImageUrl: string;
  propertyId: string;
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

export function PropertyOverview({
  title,
  price,
  status,
  location,
  description,
  mainImageUrl,
  propertyId,
}: PropertyOverviewProps) {
  const statusInfo = statusConfig[status];

  return (
    <div className="space-y-6">
      {/* Main Image and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Property Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[300px] rounded-xl overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Property Summary */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            {title}
          </h2>
          <p className="text-3xl lg:text-4xl font-bold text-primary">
            {formatCurrency(price)}
          </p>
          <span
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium w-fit",
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </span>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{location}</span>
            </div>
            <Link
              href={`/listings/map?property=${propertyId}`}
              className="text-sm text-primary hover:underline"
            >
              View on map
            </Link>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          Property Description
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
