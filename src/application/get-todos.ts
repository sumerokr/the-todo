import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const getTodos = async () => {
  try {
    const todos = await apiService.getAll();
    storeService.set(todos);
    notificationService.notify("received");
  } catch (error) {
    if (error instanceof Error) {
      notificationService.notify(error.message);
    } else {
      notificationService.notify("unknown error");
    }
  }
};
