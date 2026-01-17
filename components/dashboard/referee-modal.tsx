"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RefereeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refereeNumber: number;
  onSave: (data: RefereeData) => void;
  existingData?: RefereeData;
}

export interface RefereeData {
  name: string;
  email: string;
  phoneNumber: string;
}

export function RefereeModal({
  open,
  onOpenChange,
  refereeNumber,
  onSave,
  existingData,
}: RefereeModalProps) {
  const [formData, setFormData] = useState<RefereeData>(
    existingData || {
      name: "",
      email: "",
      phoneNumber: "",
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        name: "",
        email: "",
        phoneNumber: "",
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogHeader onClose={handleClose}>
        <div>
          <h2 className="text-lg font-bold text-foreground">Referee {refereeNumber}</h2>
          <p className="text-sm text-muted-foreground mt-1">Enter your details</p>
        </div>
      </DialogHeader>
      
      <DialogContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter referee's name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter referee's email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-foreground"
          >
            Phone number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter your referee's phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
      </DialogContent>
      
      <DialogFooter>
        <div className="flex justify-end w-full">
          <Button onClick={handleNext} size="lg">
            Next
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
