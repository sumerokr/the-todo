import type { Todo } from "@/domain/Todo";
import { toggleTodo as _toggleTodo } from "@/domain/Todo";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const toggleTodo = async (id: Todo["id"]) => {
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
    if (error instanceof Error) {
      notificationService.notify(error.message);
    } else {
      notificationService.notify("unknown error");
    }
  }
};
