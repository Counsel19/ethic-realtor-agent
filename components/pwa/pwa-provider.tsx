"use client";

import { useEffect } from "react";
import { InstallPrompt } from "./install-prompt";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // In development, unregister service worker to prevent caching issues
    const isDevelopment = process.env.NODE_ENV === "development";
    
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      if (isDevelopment) {
        // Unregister all service workers in development
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister().then((success) => {
              if (success) {
                console.log("[PWA] Service Worker unregistered for development");
              }
            });
          });
        });
        
        // Clear all caches
        if ("caches" in window) {
          caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
              caches.delete(cacheName);
            });
          });
        }
      } else {
        // Only register in production
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
              console.log(
                "[PWA] Service Worker registered:",
                registration.scope
              );
              registration.update();
            })
            .catch((error) => {
              console.error("[PWA] Service Worker registration failed:", error);
            });
        });
      }
    }
  }, []);

  return (
    <>
      {children}
      <InstallPrompt />
    </>
  );
}
