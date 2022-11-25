import type { Todo } from "@/domain/Todo";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const deleteTodo = async (id: Todo["id"]) => {
  try {
    await apiService.delete(id);
    storeService.delete(id);
    notificationService.notify("deleted");
  } catch (error) {
    if (error instanceof Error) {
      notificationService.notify(error.message);
    } else {
      notificationService.notify("unknown error");
    }
  }
};
