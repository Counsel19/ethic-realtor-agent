"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith("/dashboard/listings")) {
    return "Listings";
  }
  if (pathname.startsWith("/dashboard/payouts")) {
    return "Payouts";
  }
  if (pathname.startsWith("/dashboard/profile")) {
    return "Profile";
  }
  if (pathname.startsWith("/dashboard/support")) {
    return "Support";
  }
  if (pathname.startsWith("/dashboard/notifications")) {
    return "Notifications";
  }
  return "Dashboard";
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="pb-20 lg:pb-0 min-h-screen">
          <DashboardHeader title={title} />
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
