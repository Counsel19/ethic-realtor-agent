"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold text-foreground mb-4">FAQs</h2>
      <div className="space-y-2">
        {faqs.map((faq) => {
          const isOpen = openItems.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-white border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {faq.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {faq.description}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground shrink-0 ml-4 transition-transform",
                    isOpen && "transform rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mt-4">
                    {faq.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
