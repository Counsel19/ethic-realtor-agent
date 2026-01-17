"use client";

import { useState } from "react";
import { NotificationsList } from "@/components/dashboard/notifications-list";

// Sample data - replace with actual API call
const sampleNotifications = [
  {
    id: "1",
    type: "review" as const,
    primaryMessage: "John Doe just logged in a review",
    secondaryMessage: "House is too old and toilet is broken",
    linkText: "See review",
    linkHref: "/dashboard/reviews/1",
    isRead: false,
  },
  {
    id: "2",
    type: "payment" as const,
    primaryMessage: "Customer payment",
    secondaryMessage: "Jane T just uploaded a receipt",
    linkText: "See transaction",
    linkHref: "/dashboard/transactions/2",
    isRead: false,
  },
  {
    id: "3",
    type: "payment" as const,
    primaryMessage: "Customer payment",
    secondaryMessage: "Jane T just uploaded a receipt",
    linkText: "See transaction",
    linkHref: "/dashboard/transactions/3",
    isRead: false,
  },
  {
    id: "4",
    type: "payment" as const,
    primaryMessage: "Customer payment",
    secondaryMessage: "Jane T just uploaded a receipt",
    linkText: "See transaction",
    linkHref: "/dashboard/transactions/4",
    isRead: false,
  },
  {
    id: "5",
    type: "review" as const,
    primaryMessage: "John Doe just logged in a review",
    secondaryMessage: "House is too old and toilet is broken",
    linkText: "See review",
    linkHref: "/dashboard/reviews/5",
    isRead: false,
  },
  {
    id: "6",
    type: "review" as const,
    primaryMessage: "John Doe just logged in a review",
    secondaryMessage: "House is too old and toilet is broken",
    linkText: "See review",
    linkHref: "/dashboard/reviews/6",
    isRead: false,
  },
  {
    id: "7",
    type: "review" as const,
    primaryMessage: "John Doe just logged in a review",
    secondaryMessage: "House is too old and toilet is broken",
    linkText: "See review",
    linkHref: "/dashboard/reviews/7",
    isRead: false,
  },
];

export default function NotificationsPage() {
  const [notifications] = useState(sampleNotifications);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <NotificationsList notifications={notifications} />
      </div>
    </div>
  );
}
