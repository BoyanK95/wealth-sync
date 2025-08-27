"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useNotifications } from "@/hooks/use-notifications";

export function NotificationBellComponent() {
//   const { notifications } = useNotifications();
  const unreadCount = 0

  return (
    <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Button>
  );
}
