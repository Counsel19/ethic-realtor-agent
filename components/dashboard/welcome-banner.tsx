import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WelcomeBannerProps {
  userName?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  hideAction?: boolean;
}

export function WelcomeBanner({
  userName = "John",
  message = "List properties for sale and rent ethically",
  actionLabel = "List a property",
  onAction,
  hideAction = false,
}: WelcomeBannerProps) {
  return (
    <div className="bg-primary text-white rounded-xl p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl lg:text-3xl font-bold">Welcome, {userName}</h2>
          <p className="text-white/80 text-sm lg:text-base">{message}</p>
        </div>
        {!hideAction && (
          <Button
            onClick={onAction}
            variant="secondary"
            className="w-full lg:w-auto shrink-0 h-11"
            size="lg"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
