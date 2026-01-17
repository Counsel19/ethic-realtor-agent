"use client";

import { SupportWelcomeBanner } from "@/components/dashboard/support-welcome-banner";
import { FAQAccordion } from "@/components/dashboard/faq-accordion";

// Sample FAQ data - replace with actual API call
const sampleFAQs = [
  {
    id: "1",
    title: "FAQ 1",
    description: "We noticed you have some issues",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "2",
    title: "FAQ 2",
    description: "We noticed you have some issues",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "3",
    title: "FAQ 3",
    description: "We noticed you have some issues",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "4",
    title: "FAQ 4",
    description: "We noticed you have some issues",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "5",
    title: "FAQ 5",
    description: "We noticed you have some issues",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "6",
    title: "FAQ 6",
    description: "We noticed you have some issues",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function SupportPage() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Banner */}
      <SupportWelcomeBanner />

      {/* FAQs Section */}
      <div className="bg-white rounded-lg border border-border p-6 lg:p-8">
        <FAQAccordion faqs={sampleFAQs} />
      </div>
    </div>
  );
}
