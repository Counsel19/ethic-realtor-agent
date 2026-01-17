"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "John Bosco",
    email: "johnbosco@mail.com",
    phoneNumber: "08012345678",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Handle form submission to API
    console.log("Updating profile:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/profile");
    }, 1000);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-border">
        {/* Header */}
        <div className="border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                Edit Profile
              </h1>
            </div>
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 lg:px-8 py-8">
          <div className="space-y-6 max-w-2xl">
            {/* Full Name */}
            <div className="flex items-center justify-between gap-4 py-2 border-b border-border">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground flex-1"
              >
                Full Name
              </label>
              <div className="flex-1 max-w-md ml-8">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between gap-4 py-2 border-b border-border">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground flex-1"
              >
                Email
              </label>
              <div className="flex-1 max-w-md ml-8">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between gap-4 py-2 border-b border-border">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-foreground flex-1"
              >
                Phone Number
              </label>
              <div className="flex-1 max-w-md ml-8">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between gap-4 py-2 border-b border-border">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground flex-1"
              >
                Password
              </label>
              <div className="flex-1 max-w-md ml-8">
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="Enter new password (leave blank to keep current)"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
