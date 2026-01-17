"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerificationTabs } from "@/components/dashboard/verification-tabs";
import { ListingsTable } from "@/components/dashboard/listings-table";
import { Pagination } from "@/components/dashboard/pagination";

const tabs = [
  { id: "listed", label: "Listed" },
  { id: "verified", label: "Verified" },
  { id: "sold", label: "Sold" },
];

// Sample data - replace with actual API call
const sampleListings = {
  listed: [
    {
      id: "1",
      propertyType: "Semi detached apartment",
      location: "Obafemi Owode",
      price: 3000000,
      status: "verification-pending" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
    {
      id: "2",
      propertyType: "Semi detached apartment",
      location: "Obafemi Owode",
      price: 3000000,
      status: "verification-pending" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
    {
      id: "3",
      propertyType: "Semi detached apartment",
      location: "Obafemi Owode",
      price: 3000000,
      status: "verification-pending" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
  ],
  verified: [
    {
      id: "4",
      propertyType: "Semi detached apartment",
      location: "Obafemi Owode",
      price: 3000000,
      status: "verified" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
  ],
  sold: [
    {
      id: "5",
      propertyType: "Semi detached apartment",
      location: "Obafemi Owode",
      price: 3000000,
      status: "sold" as const,
      imageUrl: "/images/2-bedroom-flat.jpg",
    },
  ],
};

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState("listed");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get listings based on active tab
  const allListings = sampleListings[activeTab as keyof typeof sampleListings] || [];
  
  // Filter by search query
  const filteredListings = allListings.filter((listing) =>
    listing.propertyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate listings
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = filteredListings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when tab or search changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-border">
        <div className="px-4 lg:px-8">
          <VerificationTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {/* New Property Button */}
        <div className="px-4 lg:px-8 py-4 border-b border-border">
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard/listings/new">
              <Plus className="h-4 w-4" />
              New property
            </Link>
          </Button>
        </div>

        {/* Listings Table */}
        <div className="px-4 lg:px-8 py-6">
          <ListingsTable listings={paginatedListings} />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 lg:px-8 pb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
