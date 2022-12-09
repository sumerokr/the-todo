import type { ToggleTodoUC } from "@/application/ports";
import { toggleTodo as _toggleTodo } from "@/domain/Todo";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const toggleTodo: ToggleTodoUC = async (id) => {
  const todo = storeService.getById(id);
  if (!todo) {
    return;
  }
  const toggledTodo = _toggleTodo(todo);

  try {
    await apiService.update(toggledTodo);
    storeService.update(toggledTodo);
    notificationService.notify("toggled");
  } catch (error) {
    const message = (() => {
      return error instanceof Error ? error.message : "unknown error";
    })();
    notificationService.notify(message);
  }
};
