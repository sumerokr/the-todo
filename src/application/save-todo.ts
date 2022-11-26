import { createTodo as _createTodo } from "@/domain/Todo";
import type { SaveTodoUC } from "@/application/ports";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";
import { v4 as uuidv4 } from "uuid";

export const saveTodo: SaveTodoUC = async (title) => {
  try {
    const todo = _createTodo({
      id: uuidv4(),
      title,
      createdAt: new Date().toISOString(),
    });

    await apiService.save(todo);
    storeService.save(todo);
    notificationService.notify("saved");
  } catch (error) {
    if (error instanceof Error) {
      notificationService.notify(error.message);
    } else {
      notificationService.notify("unknown error");
    }
  }
};
