"use client";

import { Bath, ChefHat, WashingMachine, Trees, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

interface Facility {
  name: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

interface FacilitiesProps {
  facilities: Facility[];
  className?: string;
}

export function Facilities({ facilities, className }: FacilitiesProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">Facilities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {facilities.map((facility) => {
          const Icon = facility.icon;
          return (
            <div
              key={facility.name}
              className="flex items-center gap-2 p-4 border border-border rounded-lg"
            >
              <Icon className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {facility.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {facility.value === "None" || facility.value === 0
                    ? "None"
                    : facility.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Facility icons mapping
export const facilityIcons = {
  bathroom: Bath,
  kitchen: ChefHat,
  toilet: WashingMachine,
  yard: Trees,
  dining: UtensilsCrossed,
};
