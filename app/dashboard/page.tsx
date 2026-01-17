"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RecentPayouts } from "@/components/dashboard/recent-payouts";
import { ListedProperties } from "@/components/dashboard/listed-properties";

export default function DashboardPage() {
  // Sample property data
  const sampleProperties = [
    {
      id: "1",
      title: "2 Bedroom flat",
      price: 700000,
      location: "Sango Elewure",
      type: "SALE" as const,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      status: "pending" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
    {
      id: "2",
      title: "2 Bedroom flat",
      price: 700000,
      location: "Sango Elewure",
      type: "SALE" as const,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      status: "approved" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
  ];

  return (
    <div className="min-h-screen">

      <div className="p-4 lg:p-8 space-y-6">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KPI Cards - Left Column */}
          <div className="space-y-4 lg:col-span-1">
            <KPICard
              title="Properties for sale"
              value={900}
              actionLabel="See all properties"
              actionHref="/dashboard/listings"
            />
            <KPICard
              title="Total customers"
              value={10}
              actionLabel="See all properties"
              actionHref="/dashboard/listings"
            />
            <KPICard
              title="Total revenue"
              value="89,999,000"
              actionLabel="See wallet"
              actionHref="/dashboard/payouts"
            />
          </div>

          {/* Recent Payouts - Right Column */}
          <div className="lg:col-span-1">
            <RecentPayouts
              headerAction={{
                label: "Go to wallet",
                href: "/dashboard/payouts",
              }}
            />
          </div>
        </div>

        {/* Listed Properties - Full Width */}
        <ListedProperties
          properties={sampleProperties}
          headerAction={{
            label: "See all properties",
            href: "/dashboard/listings",
          }}
        />
      </div>
    </div>
  );
}
