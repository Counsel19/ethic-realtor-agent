"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, FileText } from "lucide-react";

interface VerificationSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function VerificationSuccessModal({
  open,
  onClose,
}: VerificationSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {/* Illustration Section */}
        <div className="flex flex-col items-center py-8 px-4">
          {/* Illustration Container */}
          <div className="relative w-full max-w-xs mb-6">
            {/* Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Floor plan outlines */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-12 border-2 border-muted/30 rounded-sm opacity-50" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-12 border-2 border-muted/30 rounded-sm opacity-50" />
              {/* Checkmarks */}
              <CheckCircle2 className="absolute top-4 left-8 h-4 w-4 text-green-500 opacity-30" />
              <CheckCircle2 className="absolute top-8 right-12 h-3 w-3 text-green-500 opacity-30" />
              <CheckCircle2 className="absolute bottom-4 left-12 h-3 w-3 text-green-500 opacity-30" />
            </div>

            {/* Main Illustration */}
            <div className="relative flex items-center justify-center gap-4">
              {/* House */}
              <div className="relative">
                <div className="w-20 h-20 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Home className="h-10 w-10 text-accent" />
                </div>
              </div>

              {/* Clipboard with Document */}
              <div className="relative">
                <div className="w-16 h-20 bg-muted/50 rounded-t-sm border-2 border-muted relative">
                  {/* Clipboard Clip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-accent rounded-t-full" />
                  
                  {/* Document inside clipboard */}
                  <div className="mt-3 mx-2 bg-white rounded-sm p-2 shadow-sm">
                    {/* Document lines */}
                    <div className="space-y-1 mb-2">
                      <div className="h-1 bg-muted-foreground/20 rounded w-full" />
                      <div className="h-1 bg-muted-foreground/20 rounded w-3/4" />
                      <div className="h-1 bg-muted-foreground/20 rounded w-full" />
                    </div>
                    
                    {/* Grid/Table */}
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="h-2 bg-muted-foreground/10 rounded" />
                      <div className="h-2 bg-muted-foreground/10 rounded" />
                      <div className="h-2 bg-muted-foreground/10 rounded" />
                    </div>
                    
                    {/* Approved Stamp */}
                    <div className="flex justify-end mt-1">
                      <div className="bg-primary text-primary-foreground text-[8px] font-bold px-2 py-1 rounded-full">
                        APPROVED
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              Verification submitted successfully
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              We are in the process of verifying your document. You will be notified in the next 24-48hrs
            </p>
          </div>
        </div>
      </DialogContent>
      
      <DialogFooter>
        <Button onClick={onClose} className="w-full" size="lg">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
