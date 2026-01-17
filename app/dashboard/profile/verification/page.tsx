"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { VerificationTabs } from "@/components/dashboard/verification-tabs";
import { TermsModal } from "@/components/dashboard/terms-modal";
import { RefereeModal, type RefereeData } from "@/components/dashboard/referee-modal";
import { VerificationSuccessModal } from "@/components/dashboard/verification-success-modal";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "personal", label: "Personal Verification" },
  { id: "professional", label: "Professional & Legal Authority" },
  { id: "financial", label: "Financial Payout Details" },
];

const idTypes = [
  { value: "", label: "Select ID" },
  { value: "national-id", label: "National ID" },
  { value: "driver-license", label: "Driver's License" },
  { value: "passport", label: "Passport" },
  { value: "voter-card", label: "Voter's Card" },
];

export default function VerificationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [refereeModalOpen, setRefereeModalOpen] = useState(false);
  const [selectedRefereeNumber, setSelectedRefereeNumber] = useState(1);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullLegalName: "",
    idType: "",
    idCopy: null as File | null,
    passportPhoto: null as File | null,
    proofOfAddress: null as File | null,
    serviceAgreementAccepted: false,
    professionalCertificate: null as File | null,
    referees: {} as Record<number, RefereeData>,
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    bankVerificationNumber: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (field: string) => (file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form data:", formData);
    // Show success modal after submission
    setSuccessModalOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="m-4 lg:m-8 bg-white">
      {/* Header */}
      <div className=" border-b border-border ">
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
                Complete Profile Verification
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
          {activeTab === "personal" && (
            <>
              {/* Full Legal Name */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label
                  htmlFor="fullLegalName"
                  className="text-sm font-medium text-foreground col-span-1"
                >
                  Full Legal Name
                </label>
                <Input
                  id="fullLegalName"
                  name="fullLegalName"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullLegalName}
                  onChange={handleInputChange}
                  className="col-span-2"
                />
              </div>

              {/* Preferred Government-Issued ID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label
                  htmlFor="idType"
                  className="text-sm font-medium text-foreground col-span-1"
                >
                  Preferred Government-Issued ID
                </label>
                <Select
                  id="idType"
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                  className="col-span-2 w-full"
                >
                  {idTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Upload Copy of ID */}
              <FileUpload
                label="Upload Copy of ID"
                onFileChange={handleFileChange("idCopy")}
                accept="image/*"
              />

              {/* Recent Passport Photograph */}
              <FileUpload
                label="Recent Passport Photograph"
                onFileChange={handleFileChange("passportPhoto")}
                accept="image/*"
              />

              {/* Proof of Current Address */}
              <FileUpload
                label="Proof of Current Address"
                onFileChange={handleFileChange("proofOfAddress")}
                accept="image/*"
              />
            </>
          )}

          {activeTab === "professional" && (
            <div className="space-y-6">
              {/* Execution of Service Agreement */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <label className="text-sm font-bold text-foreground">
                  Execution of Service Agreement
                </label>
                <button
                  onClick={() => setTermsModalOpen(true)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    formData.serviceAgreementAccepted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-accent bg-accent/10 text-accent hover:bg-accent/20"
                  )}
                >
                  Accept terms and conditions
                </button>
              </div>

              {/* Referees Section */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-foreground block">
                  Referees
                </label>
                <div className="space-y-3">
                  {[1, 2].map((num) => {
                    const refereeData = formData.referees[num];
                    return (
                      <button
                        key={num}
                        onClick={() => {
                          setSelectedRefereeNumber(num);
                          setRefereeModalOpen(true);
                        }}
                        className={cn(
                          "w-full px-4 py-2 rounded-md text-sm font-medium text-left border transition-colors",
                          refereeData
                            ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                            : "border-accent bg-accent/10 text-accent hover:bg-accent/20"
                        )}
                      >
                        {refereeData
                          ? `Referee ${num}: ${refereeData.name}`
                          : `Add Referee ${num}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Professional Certificate Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground block">
                    Professional Certificate
                  </label>
                  <p className="text-sm text-muted-foreground">
                    e.g., Nigerian Institution of Estate Surveyors and Valuers - NIESV
                  </p>
                  <FileUpload
                    onFileChange={handleFileChange("professionalCertificate")}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "financial" && (
            <div className="space-y-0">
              {/* Bank Account Name */}
              <div className="flex items-start justify-between py-4 border-b border-border">
                <div className="flex-1 space-y-1">
                  <label className="text-sm font-bold text-foreground block">
                    Bank Account Name
                  </label>
                  <p className="text-xs text-muted-foreground">For your payouts</p>
                </div>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="bankAccountName"
                    name="bankAccountName"
                    type="text"
                    placeholder="Name on your account"
                    value={formData.bankAccountName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Bank Account Number */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <label className="text-sm font-bold text-foreground flex-1">
                  Bank Account Number
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    type="text"
                    placeholder="Recipient's Number"
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Bank Name */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <label className="text-sm font-bold text-foreground flex-1">
                  Bank Name
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="bankName"
                    name="bankName"
                    type="text"
                    placeholder="Enter Bank Name"
                    value={formData.bankName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Bank Verification Number */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <label className="text-sm font-bold text-foreground flex-1">
                  Bank Verification Number
                </label>
                <div className="flex-1 max-w-md ml-8">
                  <Input
                    id="bankVerificationNumber"
                    name="bankVerificationNumber"
                    type="text"
                    placeholder="Enter BVN"
                    value={formData.bankVerificationNumber}
                    onChange={handleInputChange}
                    maxLength={11}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <TermsModal
        open={termsModalOpen}
        onOpenChange={setTermsModalOpen}
        onAccept={() => {
          setFormData((prev) => ({
            ...prev,
            serviceAgreementAccepted: true,
          }));
        }}
      />

      {/* Referee Modal */}
      <RefereeModal
        open={refereeModalOpen}
        onOpenChange={setRefereeModalOpen}
        refereeNumber={selectedRefereeNumber}
        onSave={(data) => {
          setFormData((prev) => ({
            ...prev,
            referees: {
              ...prev.referees,
              [selectedRefereeNumber]: data,
            },
          }));
        }}
        existingData={formData.referees[selectedRefereeNumber]}
      />

      {/* Verification Success Modal */}
      <VerificationSuccessModal
        open={successModalOpen}
        onClose={handleSuccessClose}
      />
    </div>
  );
}
