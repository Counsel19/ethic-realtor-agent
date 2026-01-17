"use client";

import { FileUpload } from "@/components/ui/file-upload";

interface MediaUploadSectionProps {
  primaryImage: File | null;
  otherImages: File[];
  videoWalkthrough: File | null;
  floorPlans: File[];
  onPrimaryImageChange: (file: File | null) => void;
  onOtherImagesChange: (files: File[]) => void;
  onVideoWalkthroughChange: (file: File | null) => void;
  onFloorPlansChange: (files: File[]) => void;
}

export function MediaUploadSection({
  primaryImage,
  otherImages,
  videoWalkthrough,
  floorPlans,
  onPrimaryImageChange,
  onOtherImagesChange,
  onVideoWalkthroughChange,
  onFloorPlansChange,
}: MediaUploadSectionProps) {
  return (
    <div className="space-y-6">
      {/* Primary Image */}
      <div className="flex items-start justify-between py-2">
        <label className="text-sm font-medium text-foreground flex-1 pt-2">
          Primary Image
        </label>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onPrimaryImageChange}
            accept="image/*"
            description="SVG, PNG, JPG or GIF (max. 800x400px)"
            label=""
          />
        </div>
      </div>

      {/* Other images */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-foreground block">
            Other images
          </label>
          <p className="text-xs text-muted-foreground">
            At least 5 images. Must include interior and exterior.
          </p>
        </div>
        <div className="flex-1 max-w-md ml-8">
          <div className="space-y-4">
            <FileUpload
              onMultipleFileChange={(files) => {
                onOtherImagesChange([...otherImages, ...files]);
              }}
              accept="image/*"
              description="SVG, PNG, JPG or GIF (max. 800x400px)"
              multiple={true}
              label=""
            />
            {/* Show uploaded images */}
            {otherImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {otherImages.length} image(s) uploaded
                </p>
                <div className="flex flex-wrap gap-2">
                  {otherImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative group bg-muted rounded p-2"
                    >
                      <span className="text-xs text-muted-foreground">
                        {image.name}
                      </span>
                      <button
                        onClick={() => {
                          onOtherImagesChange(
                            otherImages.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video walkthrough (optional) */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <label className="text-sm font-medium text-foreground flex-1 pt-2">
          Video walkthrough (optional)
        </label>
        <div className="flex-1 max-w-md ml-8">
          <FileUpload
            onFileChange={onVideoWalkthroughChange}
            accept="video/*"
            description="MP4, MOV, AVI (max. 100MB)"
            label=""
          />
        </div>
      </div>

      {/* Floor plans */}
      <div className="flex items-start justify-between py-2 border-t border-border">
        <label className="text-sm font-medium text-foreground flex-1 pt-2">
          Floor plans
        </label>
        <div className="flex-1 max-w-md ml-8">
          <div className="space-y-4">
            <FileUpload
              onMultipleFileChange={(files) => {
                onFloorPlansChange([...floorPlans, ...files]);
              }}
              accept="image/*"
              description="SVG, PNG, JPG or GIF (max. 800x400px)"
              multiple={true}
              label=""
            />
            {/* Show uploaded floor plans */}
            {floorPlans.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {floorPlans.length} floor plan(s) uploaded
                </p>
                <div className="flex flex-wrap gap-2">
                  {floorPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="relative group bg-muted rounded p-2"
                    >
                      <span className="text-xs text-muted-foreground">
                        {plan.name}
                      </span>
                      <button
                        onClick={() => {
                          onFloorPlansChange(
                            floorPlans.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove floor plan"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
