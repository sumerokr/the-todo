import type { DraftTodo } from "@/domain/Todo";
import { createTodo as _createTodo } from "@/domain/Todo";
import type { ApiService, StoreService, NotificationService } from "./ports";
import { v4 as uuidv4 } from "uuid";

declare const apiService: ApiService;
declare const storeService: StoreService;
declare const notificationService: NotificationService;

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
