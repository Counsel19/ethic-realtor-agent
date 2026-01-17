"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CreditCard,
  User,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  House,
} from "lucide-react";
import Logo from "@/components/atoms/logo";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Listings",
    href: "/dashboard/listings",
    icon: Home,
    subItems: [
      { name: "All Listing", href: "/dashboard/listings", icon: House },
      { name: "New Listing", href: "/dashboard/listings/new", icon: Plus },
    ],
  },
  { name: "Payouts", href: "/dashboard/payouts", icon: CreditCard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand if any sub-item is active
    return navigation
      .filter((item) => {
        if (!item.subItems) return false;
        return item.subItems.some((sub) => pathname === sub.href);
      })
      .map((item) => item.name);
  });

  const toggleExpand = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col grow bg-primary pt-6 pb-4 overflow-y-auto">
        <div className="flex items-center shrink-0 px-6 mb-2">
          <Logo width={150} height={140} className="h-[70px] w-auto" />
        </div>
        <div className="mt-8 flex-1 flex flex-col">
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedItems.includes(item.name);
              const isActive =
                pathname === item.href ||
                (hasSubItems &&
                  item.subItems?.some((sub) => pathname === sub.href));
              const Icon = item.icon;

              return (
                <div key={item.name}>
                  {hasSubItems ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className={cn(
                          "group w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                          isActive
                            ? "bg-primary-foreground/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-5 w-5 shrink-0" />
                          {item.name}
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                  "group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                  isSubActive
                                    ? "bg-primary-foreground/10 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                              >
                                {SubIcon && (
                                  <SubIcon className="mr-3 h-4 w-4 shrink-0" />
                                )}
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-primary-foreground/10 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
