"use client";

import { useState, useEffect } from "react";
import { Download, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Detect iOS device
const isIOS = () => {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

// Detect if running in standalone mode (already installed)
const isStandalone = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;
};

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    const ios = isIOS();
    setIsIOSDevice(ios);

    // Check if app is already installed
    if (isStandalone()) {
      console.log("[PWA] App is already installed (standalone mode)");
      setIsInstalled(true);
      return;
    }

    // Check if app was installed before
    if (localStorage.getItem("pwa-installed") === "true") {
      console.log("[PWA] App was previously installed");
      setIsInstalled(true);
      return;
    }

    // For iOS, show custom prompt instead of waiting for beforeinstallprompt
    if (ios) {
      console.log("[PWA] iOS device detected - showing custom install prompt");
      setTimeout(() => {
        setShowIOSPrompt(true);
      }, 3000);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("[PWA] beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        setShowPrompt(true);
        console.log("[PWA] Showing install prompt");
      }, 3000);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    // Check if app was just installed
    window.addEventListener("appinstalled", () => {
      console.log("[PWA] App was installed");
      setIsInstalled(true);
      setShowPrompt(false);
      localStorage.setItem("pwa-installed", "true");
    });

    // Log if event doesn't fire (for debugging)
    setTimeout(() => {
      if (!deferredPrompt) {
        console.warn("[PWA] beforeinstallprompt event not fired");
        console.warn("[PWA] Possible reasons:");
        console.warn("  1. Not on HTTPS (required for PWA)");
        console.warn("  2. Manifest.json not accessible");
        console.warn("  3. Icons not correct size");
        console.warn("  4. App already installed");
        console.warn("  5. Browser doesn't support PWA");
      }
    }, 5000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsInstalled(true);
      localStorage.setItem("pwa-installed", "true");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  const handleIOSDismiss = () => {
    setShowIOSPrompt(false);
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Show iOS-specific prompt
  if (isIOSDevice && showIOSPrompt && !sessionStorage.getItem("pwa-prompt-dismissed")) {
    return (
      <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:max-w-md z-50">
        <div className="bg-white border border-border rounded-lg shadow-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Install Ethic Realtor App
              </h3>
              <p className="text-xs text-muted-foreground">
                Add to your home screen for quick access
              </p>
            </div>
            <button
              onClick={handleIOSDismiss}
              className="p-1 hover:bg-muted rounded-md transition-colors ml-2"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 mb-3">
            <p className="text-xs text-foreground font-medium mb-2">
              To install on iOS:
            </p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Tap the <Share2 className="h-3 w-3 inline" /> Share button</li>
              <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
              <li>Tap &quot;Add&quot; to confirm</li>
            </ol>
          </div>

          <Button
            onClick={handleIOSDismiss}
            variant="outline"
            size="sm"
            className="w-full h-8"
          >
            Got it
          </Button>
        </div>
      </div>
    );
  }

  // Show standard install prompt for Android/Desktop
  if (
    !showPrompt ||
    !deferredPrompt ||
    sessionStorage.getItem("pwa-prompt-dismissed") === "true"
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:max-w-md z-50">
      <div className="bg-white border border-border rounded-lg shadow-lg p-4 flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-sm mb-1">
            Install Ethic Realtor App
          </h3>
          <p className="text-xs text-muted-foreground">
            Get quick access and work offline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleInstallClick}
            size="sm"
            className="h-8"
          >
            <Download className="h-4 w-4 mr-1" />
            Install
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
