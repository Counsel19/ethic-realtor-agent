"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyImagesProps {
  images: string[];
  className?: string;
}

export function PropertyImages({ images, className }: PropertyImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">Property Images</h3>
      
      {/* Thumbnail Gallery */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((imageUrl, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={cn(
              "relative w-24 h-24 rounded-lg overflow-hidden shrink-0 transition-all",
              selectedImageIndex === index
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={imageUrl}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {/* Large Display Image */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          src={images[selectedImageIndex]}
          alt={`Property image ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
