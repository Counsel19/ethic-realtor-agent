"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: PricingData) => void;
  existingData?: PricingData;
}

export interface PricingData {
  priceType: string;
  value: string;
  serviceCharge: string;
}

const priceTypes = [
  { value: "", label: "Select price type" },
  { value: "rent", label: "Rent" },
  { value: "sale", label: "Sale" },
  { value: "rent-to-own", label: "Rent to Own" },
];

export function PricingDetailsModal({
  open,
  onOpenChange,
  onSave,
  existingData,
}: PricingDetailsModalProps) {
  const [formData, setFormData] = useState<PricingData>(
    existingData || {
      priceType: "",
      value: "",
      serviceCharge: "",
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleClose = () => {
    // Reset form if closing without saving
    if (!existingData) {
      setFormData({
        priceType: "",
        value: "",
        serviceCharge: "",
      });
    }
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      
      {/* Modal - Right Side Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-border">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">Pricing details</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your details</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded-md transition-colors ml-4"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="priceType"
              className="text-sm font-medium text-foreground"
            >
              Price type
            </label>
            <Select
              id="priceType"
              name="priceType"
              value={formData.priceType}
              onChange={handleInputChange}
            >
              {priceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="value"
              className="text-sm font-medium text-foreground"
            >
              Value
            </label>
            <Input
              id="value"
              name="value"
              type="text"
              placeholder="Enter value"
              value={formData.value}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="serviceCharge"
              className="text-sm font-medium text-foreground"
            >
              Service charge
            </label>
            <Input
              id="serviceCharge"
              name="serviceCharge"
              type="text"
              placeholder="Enter service charge"
              value={formData.serviceCharge}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-border">
          <Button onClick={handleNext} size="lg">
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
