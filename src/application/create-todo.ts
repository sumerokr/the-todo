import { createTodo as _createTodo } from "@/domain/Todo";
import type { CreateTodoUC } from "@/application/ports";
import { apiService } from "@/services/api-service";
import { storeService } from "@/services/store-service";
import { notificationService } from "@/services/notification-service";
import { v4 as uuidv4 } from "uuid";

export const createTodo: CreateTodoUC = async ({ title }) => {
  const todo = _createTodo({
    id: uuidv4(),
    title,
    createdAt: new Date().toISOString(),
  });

  await apiService.save(todo);
  storeService.save(todo);
  notificationService.notify("saved");
};
