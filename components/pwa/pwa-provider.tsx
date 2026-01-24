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
        // Register in production
        const registerServiceWorker = () => {
          navigator.serviceWorker
            .register("/sw.js", { scope: "/" })
            .then((registration) => {
              console.log(
                "[PWA] Service Worker registered:",
                registration.scope
              );
              // Check for updates
              registration.update();
              
              // Check if update is available
              registration.addEventListener("updatefound", () => {
                console.log("[PWA] Service Worker update found");
              });
            })
            .catch((error) => {
              console.error("[PWA] Service Worker registration failed:", error);
            });
        };

        // Register immediately if page is already loaded
        if (document.readyState === "complete") {
          registerServiceWorker();
        } else {
          window.addEventListener("load", registerServiceWorker);
        }
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
