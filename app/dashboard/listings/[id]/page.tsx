"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { VerificationTabs } from "@/components/dashboard/verification-tabs";
import { PropertyOverview } from "@/components/dashboard/property-overview";
import { Facilities, facilityIcons } from "@/components/dashboard/facilities";
import { PropertyImages } from "@/components/dashboard/property-images";
import { PropertyHistory, historyIcons } from "@/components/dashboard/property-history";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "details", label: "Details" },
  { id: "documents", label: "Documents" },
];

// Sample data - replace with actual API call
const getPropertyData = (id: string) => {
  return {
    id,
    title: "2 Bedroom flat",
    price: 700000,
    status: "verification-pending" as const,
    location: "Sango Elewure",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    mainImageUrl: "/images/2-bedroom-flat.jpg",
    images: [
      "/images/2-bedroom-flat.jpg",
      "/images/2-bedroom-flat.jpg",
      "/images/2-bedroom-flat.jpg",
    ],
    facilities: [
      { name: "Bathrooms", value: 1, icon: facilityIcons.bathroom },
      { name: "Kitchen", value: "None", icon: facilityIcons.kitchen },
      { name: "Toilet", value: "None", icon: facilityIcons.toilet },
      { name: "Yard", value: 1, icon: facilityIcons.yard },
      { name: "Dining area", value: 1, icon: facilityIcons.dining },
    ],
    history: [
      {
        stage: "Property listing",
        status: "done" as const,
        icon: historyIcons.check,
      },
      {
        stage: "Property Verification",
        status: "awaiting" as const,
        icon: historyIcons.clock,
      },
      {
        stage: "Inspection",
        status: "pending" as const,
        link: {
          label: "See inspection history",
          href: `/dashboard/listings/${id}/inspection`,
        },
        icon: historyIcons.document,
      },
      {
        stage: "Payout",
        status: "pending" as const,
        link: {
          label: "See transaction history",
          href: `/dashboard/listings/${id}/transactions`,
        },
        icon: historyIcons.card,
      },
    ],
    documents: [
      { name: "Proof of Ownership", url: "/documents/poo.pdf", type: "PDF" },
      { name: "Survey Plan", url: "/documents/survey.pdf", type: "PDF" },
      { name: "Signed Mandate Letter", url: "/documents/mandate.pdf", type: "PDF" },
    ],
  };
};

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const [activeTab, setActiveTab] = useState("details");

  const property = getPropertyData(propertyId);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-foreground">
          View Property
        </h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-border">
        <div className="px-4 lg:px-8">
          <VerificationTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="px-4 lg:px-8 py-6">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-8 col-span-2">
                {/* Property Overview */}
                <PropertyOverview
                  title={property.title}
                  price={property.price}
                  status={property.status}
                  location={property.location}
                  description={property.description}
                  mainImageUrl={property.mainImageUrl}
                  propertyId={property.id}
                />


                {/* Facilities */}
                <Facilities facilities={property.facilities} />

                {/* Property Images */}
                <PropertyImages images={property.images} />
              </div>

              <div className="w-full col-span-1 h-fit bg-[#F7F8FB] p-6 rounded-md">
                <PropertyHistory history={property.history} />
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Property Documents
              </h3>
              <div className="space-y-3">
                {property.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {doc.type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {doc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} Document
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
