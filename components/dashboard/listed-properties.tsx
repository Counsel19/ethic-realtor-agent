
import { PropertyCard } from "./property-card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "RENTAL" | "SALE";
  description: string;
  status: "pending" | "approved" | "rejected";
  imageUrl: string;
}

interface ListedPropertiesProps {
  properties?: Property[];
  headerAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function ListedProperties({
  properties = [],
  headerAction,
  className,
}: ListedPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Listed Properties
        </h2>
        {headerAction && (
          <Link
            href={headerAction.href}
            className="text-sm font-medium text-primary hover:underline"
          >
            {headerAction.label}
          </Link>
        )}
      </div>
      <div className="grid  gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
