import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";







const formatCurrency = (amount: number) => {
  return `${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)} NGN`;
};

const statusColors = {
  pending: "bg-green-100 text-green-700",
  approved: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};




interface Property {
  type: "RENTAL" | "SALE",
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  imageUrl: string;
}

interface PropertyCardProps {
  property: Property
  className?: string
}

export function PropertyCard({ property, className }: PropertyCardProps) {

  return (
    <>
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Left: Property Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[250px]">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="absolute top-3 right-3">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                statusColors[property.status]
              )}
            >
              {statusLabels[property.status]}
            </span>
          </div>

          {/* Right: Property Details */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Title and Price */}
              <div>
                <h2 className="text-2xl font-semibold mb-1">{property.title}</h2>
                <p className="text-3xl font-bold text-primary">{formatCurrency(property.price)}</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <Link
                  href={`/listings/map?property=${property.id}`}
                  className="text-sm text-accent hover:underline"
                >
                  View on map
                </Link>
              </div>

              {/* Property Description */}
              <div className="space-y-2">
                <h3 className="font-semibold">Property Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            <Button
              asChild
              className="w-full"
              size="lg"
            >
              <Link href={`/dashboard/listings/${property.id}`}>
                View details
              </Link>
            </Button>
          </div>
        </div>
      </div>


    </>
  )
}
