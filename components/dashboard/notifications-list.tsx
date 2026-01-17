"use client";

import { NotificationCard } from "./notification-card";

interface Notification {
  id: string;
  type: "review" | "payment";
  primaryMessage: string;
  secondaryMessage: string;
  linkText: string;
  linkHref: string;
  isRead?: boolean;
}

interface NotificationsListProps {
  notifications: Notification[];
  className?: string;
}

export function NotificationsList({
  notifications,
  className,
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No notifications found
      </div>
    );
  }

  return (
    <div className={className}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          id={notification.id}
          type={notification.type}
          primaryMessage={notification.primaryMessage}
          secondaryMessage={notification.secondaryMessage}
          linkText={notification.linkText}
          linkHref={notification.linkHref}
          isRead={notification.isRead}
        />
      ))}
    </div>
  );
}
