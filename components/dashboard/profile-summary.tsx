"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProfileSummaryProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onEdit?: () => void;
  className?: string;
}

export function ProfileSummary({
  name,
  email,
  avatarUrl,
  onEdit,
  className,
}: ProfileSummaryProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-border overflow-hidden", className)}>
      {/* Gradient Background */}
      <div className="h-32 bg-gradient-to-r from-purple-100 to-purple-50 relative" />
      
      {/* Profile Content */}
      <div className="px-6 pb-6 -mt-16">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-muted">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <span className="text-2xl font-bold text-primary">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Name and Email */}
          <h2 className="text-2xl font-bold text-foreground mt-4">{name}</h2>
          <p className="text-muted-foreground mt-1">{email}</p>
          
          {/* Edit Profile Button */}
          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-2"
            onClick={onEdit}
            asChild={!onEdit}
          >
            {onEdit ? (
              <>
                <Pencil className="h-4 w-4" />
                Edit profile
              </>
            ) : (
              <Link href="/dashboard/profile/edit">
                <Pencil className="h-4 w-4" />
                Edit profile
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
