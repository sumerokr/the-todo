import type { DraftTodo } from "@/domain/Todo";
import { createTodo as _createTodo } from "@/domain/Todo";
import { apiService } from "@/services/api-service";
import { storeService } from "@/services/store-service";
import { notificationService } from "@/services/notification-service";
import { v4 as uuidv4 } from "uuid";

export const createTodo = async ({ title }: DraftTodo) => {
  const todo = _createTodo({
    id: uuidv4(),
    title,
    createdAt: new Date().toISOString(),
  });

  await apiService.create(todo);
  storeService.create(todo);
  notificationService.notify("created");
};
