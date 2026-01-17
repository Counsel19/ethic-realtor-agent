"use client";

import { FileUpload } from "@/components/ui/file-upload";

interface LegalDocumentsSectionProps {
  proofOfOwnership: File | null;
  surveyPlan: File | null;
  signedMandateLetter: File | null;
  ownerId: File | null;
  approvedBuildingPlan: File | null;
  onProofOfOwnershipChange: (file: File | null) => void;
  onSurveyPlanChange: (file: File | null) => void;
  onSignedMandateLetterChange: (file: File | null) => void;
  onOwnerIdChange: (file: File | null) => void;
  onApprovedBuildingPlanChange: (file: File | null) => void;
}

export function LegalDocumentsSection({
  proofOfOwnership,
  surveyPlan,
  signedMandateLetter,
  ownerId,
  approvedBuildingPlan,
  onProofOfOwnershipChange,
  onSurveyPlanChange,
  onSignedMandateLetterChange,
  onOwnerIdChange,
  onApprovedBuildingPlanChange,
}: LegalDocumentsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Proof of Ownership */}
      <div className="flex items-start justify-between py-2">
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-foreground block">
            Proof of Ownership
          </label>
          <p className="text-xs text-muted-foreground">
            C of O, Deed, Governor&apos;s consent
          </p>
        </div>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onProofOfOwnershipChange}
            accept="image/*,.pdf"
            description="SVG, PNG, JPG or GIF (max. 800x400px)"
            label=""
          />
        </div>
      </div>

      {/* Survey Plan */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <label className="text-sm font-medium text-foreground flex-1 pt-2">
          Survey Plan
        </label>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onSurveyPlanChange}
            accept="image/*,.pdf"
            description="SVG, PNG, JPG or GIF (max. 800x400px)"
            label=""
          />
        </div>
      </div>

      {/* Signed Mandate Letter */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-foreground block">
            Signed Mandate Letter
          </label>
          <p className="text-xs text-muted-foreground">
            Or any proof of authority to sell
          </p>
        </div>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onSignedMandateLetterChange}
            accept="image/*,.pdf"
            description="SVG, PNG, JPG or GIF (max. 800x400px)"
            label=""
          />
        </div>
      </div>

      {/* Upload Owner's ID */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <label className="text-sm font-medium text-foreground flex-1 pt-2">
          Upload Owner&apos;s ID
        </label>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onOwnerIdChange}
            accept="image/*,.pdf"
            description="SVG, PNG, JPG or GIF (max. 800x400px)"
            label=""
          />
        </div>
      </div>

      {/* Approved Building Plan */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <label className="text-sm font-medium text-foreground flex-1 pt-2">
          Approved Building Plan
        </label>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onApprovedBuildingPlanChange}
            accept="image/*,.pdf"
            description="SVG, PNG, JPG or GIF (max. 800x400px)"
            label=""
          />
        </div>
      </div>
    </div>
  );
}
