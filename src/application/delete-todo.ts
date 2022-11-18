import type { Todo } from "@/domain/Todo";
import { apiService } from "@/services/api-service";
import { storeService } from "@/services/store-service";
import { notificationService } from "@/services/notification-service";

export const deleteTodo = async (id: Todo["id"]) => {
  await apiService.delete(id);
  storeService.delete(id);
  notificationService.notify("deleted");
};
