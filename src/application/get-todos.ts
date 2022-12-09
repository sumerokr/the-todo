import type { GetTodosUC } from "@/application/ports";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const getTodos: GetTodosUC = async () => {
  try {
    const todos = await apiService.getAll();
    storeService.set(todos);
    notificationService.notify("received");
  } catch (error) {
    const message = (() => {
      return error instanceof Error ? error.message : "unknown error";
    })();
    notificationService.notify(message);
  }
};
