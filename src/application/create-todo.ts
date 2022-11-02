import { createTodo as _createTodo } from "@/domain/Todo";
import type { ApiService, StoreService } from "./ports";

declare const apiService: ApiService;
declare const storeService: StoreService;

export const createTodo = async () => {
  const todo = _createTodo({
    id: "uuid",
    title: "title",
    createdAt: new Date().toISOString(),
  });

  await apiService.create(todo);
  storeService.create(todo);
};
