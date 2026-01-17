import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "../atoms/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="relative hidden w-full lg:flex lg:w-[40%] xl:w-[45%]">
        <div className="relative h-full w-full  flex justify-center items-center overflow-hidden bg-[url('/images/realtor_banner.jpg')] bg-cover bg-center">
          {/* Overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/40 z-10" />


          <Logo width={200} height={200} className="h-[200px]" />
        </div>
      </div>

      {/* Right Side - Form */}
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 lg:w-[60%] xl:w-[55%] lg:px-12",
          className
        )}
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
