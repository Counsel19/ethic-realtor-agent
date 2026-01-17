"use client";

import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  propertyDetails: {
    propertyTitle: string;
    location?: string;
    priceType?: string;
    value?: string;
    status?: string;
  };
}

export function ConfirmDetailsModal({
  open,
  onOpenChange,
  onConfirm,
  propertyDetails,
}: ConfirmDetailsModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const formatPrice = (priceType?: string, value?: string) => {
    if (!value) return "";
    // Format number with commas if it's a number
    const numValue = value.replace(/,/g, "");
    if (!isNaN(Number(numValue))) {
      return `${Number(numValue).toLocaleString()} NGN`;
    }
    return `${value} NGN`;
  };

  const formatStatus = (status?: string) => {
    if (status === "for-rent") return "Rent";
    if (status === "for-sale") return "Sale";
    return status || "Rent";
  };

  const locationText = propertyDetails.location || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader onClose={() => onOpenChange(false)}>
        Confirm details
      </DialogHeader>
      
      <DialogContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to list{" "}
            <span className="text-primary font-medium">
              {propertyDetails.propertyTitle || "this property"}
            </span>{" "}
            {locationText && (
              <>
                at{" "}
                <span className="text-primary font-medium">{locationText}</span>{" "}
              </>
            )}
            for{" "}
            <span className="text-primary font-medium">
              {formatStatus(propertyDetails.status)}
            </span>{" "}
            {propertyDetails.value && (
              <>
                at{" "}
                <span className="text-primary font-medium">
                  {formatPrice(propertyDetails.priceType, propertyDetails.value)}
                </span>
              </>
            )}
            ? Once listed, customers can see the property.
          </p>
        </div>
      </DialogContent>
      
      <DialogFooter>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
            size="lg"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="w-full" size="lg">
            List property
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
