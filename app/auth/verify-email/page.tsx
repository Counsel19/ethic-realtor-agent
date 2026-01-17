"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(80); // 1:20 in seconds
  const [canResend, setCanResend] = useState(false);
  const email = "***il@mail.com"; // This would typically come from context/state

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("OTP:", otp);
  };

  const handleResend = () => {
    // Handle resend OTP logic here
    setTimer(80);
    setCanResend(false);
    console.log("Resending OTP...");
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Verify your email
          </h1>
          <p className="text-muted-foreground">
            We have sent an OTP to your email{" "}
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium text-foreground">
              OTP
            </label>
            <div className="flex items-center gap-3">
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="flex-1"
              />
              {!canResend ? (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Resend in {formatTime(timer)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm font-medium text-foreground hover:underline whitespace-nowrap"
                >
                  Resend
                </button>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-base" size="lg">
            Proceed
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
