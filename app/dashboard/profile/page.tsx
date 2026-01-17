"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileSummary } from "@/components/dashboard/profile-summary";
import { ProfileMetrics } from "@/components/dashboard/profile-metrics";
import { ProfileSettings } from "@/components/dashboard/profile-settings";
import { ListedProperties } from "@/components/dashboard/listed-properties";
import { HelpCircle, LogOut } from "lucide-react";

// Sample data - replace with actual API call
const sampleProperties = [
  {
    id: "1",
    title: "2 Bedroom flat",
    price: 10000000,
    location: "AGODI GRA",
    type: "SALE" as const,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "pending" as const,
    imageUrl: "/images/2-bedroom-flat.jpg",
  },
  {
    id: "2",
    title: "2 Bedroom flat",
    price: 10000000,
    location: "AGODI GRA",
    type: "SALE" as const,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "pending" as const,
    imageUrl: "/images/2-bedroom-flat.jpg",
  },
  {
    id: "3",
    title: "2 Bedroom flat",
    price: 10000000,
    location: "AGODI GRA",
    type: "SALE" as const,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "pending" as const,
    imageUrl: "/images/2-bedroom-flat.jpg",
  },
];

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...");
    // router.push("/auth/login");
  };

  const profileMetrics = [
    {
      title: "Properties for sale",
      value: 0,
      actionLabel: "List a property",
      actionHref: "/dashboard/listings/new",
    },
    {
      title: "Total customers",
      value: 0,
      actionLabel: "See all properties",
      actionHref: "/dashboard/listings",
    },
    {
      title: "Total revenue",
      value: 0,
      actionLabel: "See wallet",
      actionHref: "/dashboard/payouts",
    },
  ];

  const settings = [
    {
      label: "Contact Support",
      href: "/dashboard/support",
      icon: HelpCircle,
      variant: "default" as const,
    },
    {
      label: "Log Out",
      onClick: handleLogout,
      icon: LogOut,
      variant: "danger" as const,
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Profile Summary - Desktop */}
      <div className="hidden lg:block">
        <ProfileSummary
          name="John Bosco"
          email="john@bosco.mail"
          avatarUrl="/images/user-placeholder.png"
        />
      </div>

      {/* Profile Summary - Mobile */}
      <div className="lg:hidden">
        <ProfileSummary
          name="John Doe"
          email="john@mail.com"
          avatarUrl="/images/user-placeholder.png"
        />
      </div>

      {/* Profile Metrics */}
      <ProfileMetrics metrics={profileMetrics} />

      {/* Settings - Mobile Only */}
      <div className="lg:hidden">
        <ProfileSettings settings={settings} />
      </div>

      {/* Listed Properties - Desktop */}
      <div className="hidden lg:block">
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
