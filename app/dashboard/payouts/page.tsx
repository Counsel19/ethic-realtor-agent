"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { PayoutsTable } from "@/components/dashboard/payouts-table";
import { Pagination } from "@/components/dashboard/pagination";

// Sample data - replace with actual API call
const samplePayouts = [
  {
    id: "1",
    amount: 3000000,
    description: "Property payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "success" as const,
  },
  {
    id: "2",
    amount: 3000000,
    description: "Property payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "success" as const,
  },
  {
    id: "3",
    amount: 3000000,
    description: "Expected payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "pending" as const,
  },
  {
    id: "4",
    amount: 3000000,
    description: "Property payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "success" as const,
  },
  {
    id: "5",
    amount: 3000000,
    description: "Expected payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "pending" as const,
  },
  {
    id: "6",
    amount: 3000000,
    description: "Property payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "success" as const,
  },
  {
    id: "7",
    amount: 3000000,
    description: "Expected payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "pending" as const,
  },
  {
    id: "8",
    amount: 3000000,
    description: "Property payout",
    dateTime: "2023-11-03T12:00:00",
    property: {
      id: "1",
      imageUrl: "/images/2-bedroom-flat.jpg",
      type: "Semi detached apartment",
      location: "Obafemi Owode",
    },
    status: "success" as const,
  },
];

export default function PayoutsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter payouts by search query
  const filteredPayouts = samplePayouts.filter(
    (payout) =>
      payout.property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate payouts
  const totalPages = Math.ceil(filteredPayouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayouts = filteredPayouts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner
        userName="John"
        message="See your payouts here"
        hideAction
      />

      {/* Payouts Table */}
      <div className="bg-white rounded-lg border border-border">
        <div className="px-4 lg:px-8 py-6">
          <PayoutsTable payouts={paginatedPayouts} />
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
