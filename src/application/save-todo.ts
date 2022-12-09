import { v4 as uuidv4 } from "uuid";
import { createTodo as _createTodo } from "@/domain/Todo";
import type { SaveTodoUC } from "@/application/ports";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

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
    const message = (() => {
      return error instanceof Error ? error.message : "unknown error";
    })();
    notificationService.notify(message);
  }
};
