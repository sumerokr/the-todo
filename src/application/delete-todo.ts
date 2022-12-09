import type { DeleteTodoUC } from "@/application/ports";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const deleteTodo: DeleteTodoUC = async (id) => {
  try {
    await apiService.delete(id);
    storeService.delete(id);
    notificationService.notify("deleted");
  } catch (error) {
    const message = (() => {
      return error instanceof Error ? error.message : "unknown error";
    })();
    notificationService.notify(message);
  }
};
