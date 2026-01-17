"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { VerificationTabs } from "@/components/dashboard/verification-tabs";
import { PricingDetailsModal, type PricingData } from "@/components/dashboard/pricing-details-modal";
import { LocationDetailsModal, type LocationData } from "@/components/dashboard/location-details-modal";
import { MediaUploadSection } from "@/components/dashboard/media-upload-section";
import { LegalDocumentsSection } from "@/components/dashboard/legal-documents-section";
import { ConfirmDetailsModal } from "@/components/dashboard/confirm-details-modal";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "property-details", label: "Property details" },
  { id: "features", label: "Features & Specifications" },
  { id: "media", label: "Media" },
  { id: "legal", label: "Legal" },
];

const propertyTypes = [
  { value: "", label: "Select" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const statuses = [
  { value: "", label: "Select" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
];

export default function NewListingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("property-details");
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: "",
    status: "",
    propertyTitle: "",
    description: "",
    pricing: undefined as PricingData | undefined,
    location: undefined as LocationData | undefined,
    // Features & Specifications
    numberOfBedrooms: "",
    numberOfToilets: "",
    numberOfBathrooms: "",
    landSize: "",
    propertyAge: "",
    amenities: "",
    listingAvailability: "",
    contractPreference: "",
    // Media
    primaryImage: null as File | null,
    otherImages: [] as File[],
    videoWalkthrough: null as File | null,
    floorPlans: [] as File[],
    // Legal
    proofOfOwnership: null as File | null,
    surveyPlan: null as File | null,
    signedMandateLetter: null as File | null,
    ownerId: null as File | null,
    approvedBuildingPlan: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form data:", formData);
    // Navigate to next tab or show confirmation modal
    if (activeTab === "property-details") {
      setActiveTab("features");
    } else if (activeTab === "features") {
      setActiveTab("media");
    } else if (activeTab === "media") {
      setActiveTab("legal");
    } else if (activeTab === "legal") {
      // Show confirmation modal on last tab
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmListing = () => {
    // Handle final submission
    console.log("Submitting listing:", formData);
    // TODO: Submit to API
    // Redirect to listings page or show success message
    router.push("/dashboard/listings");
  };

  return (
    <div className="m-4 lg:m-8 bg-white">
      {/* Header */}
      <div className="border-b border-border">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                New Listing
              </h1>
            </div>
            <Button onClick={handleSubmit} size="lg">
              Next
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 lg:px-8">
          <VerificationTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-6 lg:p-8 space-y-6">
          {activeTab === "property-details" && (
            <div className="space-y-6">
              {/* Property Type */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-foreground flex-1">
                  Property Type
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Status
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Property Title */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Property Title
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="propertyTitle"
                    name="propertyTitle"
                    type="text"
                    placeholder="Enter property title"
                    value={formData.propertyTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1 pt-2">
                  Description
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the property"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
              </div>

              {/* Pricing details */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Pricing details
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <button
                    onClick={() => setPricingModalOpen(true)}
                    className={cn(
                      "w-full px-4 py-2 rounded-md text-sm font-medium text-left border transition-colors",
                      formData.pricing
                        ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                        : "border-accent bg-accent/10 text-accent hover:bg-accent/20"
                    )}
                  >
                    {formData.pricing
                      ? `Pricing: ${formData.pricing.priceType} - ${formData.pricing.value}`
                      : "Enter pricing details"}
                  </button>
                </div>
              </div>

              {/* Location details */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Location details
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <button
                    onClick={() => setLocationModalOpen(true)}
                    className={cn(
                      "w-full px-4 py-2 rounded-md text-sm font-medium text-left border transition-colors",
                      formData.location
                        ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                        : "border-accent bg-accent/10 text-accent hover:bg-accent/20"
                    )}
                  >
                    {formData.location
                      ? `${formData.location.city}, ${formData.location.state}`
                      : "Enter location details"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content... */}
          {activeTab === "features" && (
            <div className="space-y-6">
              {/* Number of Bedrooms */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-foreground flex-1">
                  Number of Bedrooms
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="numberOfBedrooms"
                    name="numberOfBedrooms"
                    type="number"
                    placeholder="Enter number"
                    value={formData.numberOfBedrooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Number of Toilets */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Number of Toilets
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="numberOfToilets"
                    name="numberOfToilets"
                    type="number"
                    placeholder="Enter number"
                    value={formData.numberOfToilets}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Number of Bathrooms */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Number of Bathrooms
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="numberOfBathrooms"
                    name="numberOfBathrooms"
                    type="number"
                    placeholder="Enter number"
                    value={formData.numberOfBathrooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Land Size */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Land Size
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="landSize"
                    name="landSize"
                    type="text"
                    placeholder="Enter number"
                    value={formData.landSize}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Property Age */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Property Age
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="propertyAge"
                    name="propertyAge"
                    type="text"
                    placeholder="Enter age"
                    value={formData.propertyAge}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Amenities
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Select
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                  >
                    <option value="">Select amenities</option>
                    <option value="swimming-pool">Swimming Pool</option>
                    <option value="gym">Gym</option>
                    <option value="parking">Parking</option>
                    <option value="security">Security</option>
                    <option value="elevator">Elevator</option>
                    <option value="garden">Garden</option>
                    <option value="balcony">Balcony</option>
                    <option value="furnished">Furnished</option>
                  </Select>
                </div>
              </div>

              {/* Listing Availability */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Listing Availability
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Select
                    id="listingAvailability"
                    name="listingAvailability"
                    value={formData.listingAvailability}
                    onChange={handleInputChange}
                  >
                    <option value="">Select availability</option>
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </Select>
                </div>
              </div>

              {/* Contract Preference */}
              <div className="flex items-center justify-between py-2 border-t border-border">
                <label className="text-sm font-medium text-foreground flex-1">
                  Contract Preference
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Select
                    id="contractPreference"
                    name="contractPreference"
                    value={formData.contractPreference}
                    onChange={handleInputChange}
                  >
                    <option value="">Select contact preference</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="both">Both</option>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <MediaUploadSection
              primaryImage={formData.primaryImage}
              otherImages={formData.otherImages}
              videoWalkthrough={formData.videoWalkthrough}
              floorPlans={formData.floorPlans}
              onPrimaryImageChange={(file) => {
                setFormData((prev) => ({ ...prev, primaryImage: file }));
              }}
              onOtherImagesChange={(files) => {
                setFormData((prev) => ({ ...prev, otherImages: files }));
              }}
              onVideoWalkthroughChange={(file) => {
                setFormData((prev) => ({ ...prev, videoWalkthrough: file }));
              }}
              onFloorPlansChange={(files) => {
                setFormData((prev) => ({ ...prev, floorPlans: files }));
              }}
            />
          )}

          {activeTab === "legal" && (
            <LegalDocumentsSection
              proofOfOwnership={formData.proofOfOwnership}
              surveyPlan={formData.surveyPlan}
              signedMandateLetter={formData.signedMandateLetter}
              ownerId={formData.ownerId}
              approvedBuildingPlan={formData.approvedBuildingPlan}
              onProofOfOwnershipChange={(file) => {
                setFormData((prev) => ({ ...prev, proofOfOwnership: file }));
              }}
              onSurveyPlanChange={(file) => {
                setFormData((prev) => ({ ...prev, surveyPlan: file }));
              }}
              onSignedMandateLetterChange={(file) => {
                setFormData((prev) => ({ ...prev, signedMandateLetter: file }));
              }}
              onOwnerIdChange={(file) => {
                setFormData((prev) => ({ ...prev, ownerId: file }));
              }}
              onApprovedBuildingPlanChange={(file) => {
                setFormData((prev) => ({ ...prev, approvedBuildingPlan: file }));
              }}
            />
          )}
        </div>
      </div>

      {/* Pricing Details Modal */}
      <PricingDetailsModal
        open={pricingModalOpen}
        onOpenChange={setPricingModalOpen}
        onSave={(data) => {
          setFormData((prev) => ({
            ...prev,
            pricing: data,
          }));
        }}
        existingData={formData.pricing}
      />

      {/* Location Details Modal */}
      <LocationDetailsModal
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onSave={(data) => {
          setFormData((prev) => ({
            ...prev,
            location: data,
          }));
        }}
        existingData={formData.location}
      />

      {/* Confirm Details Modal */}
      <ConfirmDetailsModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleConfirmListing}
        propertyDetails={{
          propertyTitle: formData.propertyTitle,
          location:
            formData.location?.city && formData.location?.state
              ? `${formData.location.city}, ${formData.location.state}`
              : formData.location?.city || formData.location?.state || "",
          priceType: formData.pricing?.priceType,
          value: formData.pricing?.value,
          status: formData.status,
        }}
      />
    </div>
  );
}
