import type { NotificationService } from "@/application/ports";

export const notificationService: NotificationService = {
  notify: (message) => {
    console.info(message);
  },
};
