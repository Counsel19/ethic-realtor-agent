"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: LocationData) => void;
  existingData?: LocationData;
}

export interface LocationData {
  state: string;
  city: string;
  closestLandmark: string;
  latitude: string;
  longitude: string;
}

const nigerianStates = [
  { value: "", label: "Select state" },
  { value: "abia", label: "Abia" },
  { value: "adamawa", label: "Adamawa" },
  { value: "akwa-ibom", label: "Akwa Ibom" },
  { value: "anambra", label: "Anambra" },
  { value: "bauchi", label: "Bauchi" },
  { value: "bayelsa", label: "Bayelsa" },
  { value: "benue", label: "Benue" },
  { value: "borno", label: "Borno" },
  { value: "cross-river", label: "Cross River" },
  { value: "delta", label: "Delta" },
  { value: "ebonyi", label: "Ebonyi" },
  { value: "edo", label: "Edo" },
  { value: "ekiti", label: "Ekiti" },
  { value: "enugu", label: "Enugu" },
  { value: "gombe", label: "Gombe" },
  { value: "imo", label: "Imo" },
  { value: "jigawa", label: "Jigawa" },
  { value: "kaduna", label: "Kaduna" },
  { value: "kano", label: "Kano" },
  { value: "katsina", label: "Katsina" },
  { value: "kebbi", label: "Kebbi" },
  { value: "kogi", label: "Kogi" },
  { value: "kwara", label: "Kwara" },
  { value: "lagos", label: "Lagos" },
  { value: "nasarawa", label: "Nasarawa" },
  { value: "niger", label: "Niger" },
  { value: "ogun", label: "Ogun" },
  { value: "ondo", label: "Ondo" },
  { value: "osun", label: "Osun" },
  { value: "oyo", label: "Oyo" },
  { value: "plateau", label: "Plateau" },
  { value: "rivers", label: "Rivers" },
  { value: "sokoto", label: "Sokoto" },
  { value: "taraba", label: "Taraba" },
  { value: "yobe", label: "Yobe" },
  { value: "zamfara", label: "Zamfara" },
  { value: "fct", label: "FCT (Abuja)" },
];

const cities: Record<string, string[]> = {
  lagos: ["Lagos Island", "Ikeja", "Lekki", "Victoria Island", "Surulere"],
  abuja: ["Abuja", "Garki", "Wuse", "Maitama"],
  kano: ["Kano", "Nassarawa", "Fagge"],
  rivers: ["Port Harcourt", "Bonny", "Degema"],
  // Add more cities as needed
};

export function LocationDetailsModal({
  open,
  onOpenChange,
  onSave,
  existingData,
}: LocationDetailsModalProps) {
  const [formData, setFormData] = useState<LocationData>(
    existingData || {
      state: "",
      city: "",
      closestLandmark: "",
      latitude: "",
      longitude: "",
    }
  );

  const availableCities = formData.state ? cities[formData.state] || [] : [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Reset city when state changes
      if (name === "state") {
        return { ...prev, [name]: value, city: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleNext = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleClose = () => {
    // Reset form if closing without saving
    if (!existingData) {
      setFormData({
        state: "",
        city: "",
        closestLandmark: "",
        latitude: "",
        longitude: "",
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
            <h2 className="text-lg font-bold text-foreground">Location details</h2>
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
              htmlFor="state"
              className="text-sm font-medium text-foreground"
            >
              State
            </label>
            <Select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              {nigerianStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="city"
              className="text-sm font-medium text-foreground"
            >
              City
            </label>
            <Select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!formData.state || availableCities.length === 0}
            >
              <option value="">
                {formData.state ? "Select city" : "Select state first"}
              </option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="closestLandmark"
              className="text-sm font-medium text-foreground"
            >
              Closest Landmark
            </label>
            <Input
              id="closestLandmark"
              name="closestLandmark"
              type="text"
              placeholder="Enter closest landmark"
              value={formData.closestLandmark}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="latitude"
              className="text-sm font-medium text-foreground"
            >
              Latitude
            </label>
            <Input
              id="latitude"
              name="latitude"
              type="text"
              placeholder="Enter latitude"
              value={formData.latitude}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="longitude"
              className="text-sm font-medium text-foreground"
            >
              Longitude
            </label>
            <Input
              id="longitude"
              name="longitude"
              type="text"
              placeholder="Enter longitude"
              value={formData.longitude}
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
