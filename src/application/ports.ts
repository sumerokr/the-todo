import type { Todo } from "../domain/Todo";

export type SaveTodoUC = (title: Todo["title"]) => Promise<void>;
export type getTodosUC = () => Promise<void>;
export type updateTodoUC = (todo: Todo) => Promise<void>;
export type deleteTodoUC = (id: Todo["id"]) => Promise<void>;

export interface ApiService {
  save: (todo: Todo) => Promise<void>;
  getAll: () => Promise<Todo[]>;
  update: (todo: Todo) => Promise<void>;
  delete: (id: Todo["id"]) => Promise<void>;
}

export interface StoreService {
  save: (todo: Todo) => void;
  set: (todos: Todo[]) => void;
  update: (todo: Todo) => void;
  delete: (id: Todo["id"]) => void;
  getById: (id: Todo["id"]) => Todo | undefined;
}

export interface NotificationService {
  notify: (message: string) => void;
}
