import type { Todo } from "@/domain/Todo";
import { apiService } from "@/services/api-service";
import { storeService } from "@/services/store-service";
import { notificationService } from "@/services/notification-service";

export const deleteTodo = async (todo: Todo) => {
  await apiService.delete(todo);
  storeService.delete(todo);
  notificationService.notify("deleted");
};
