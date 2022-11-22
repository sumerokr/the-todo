import type { Todo, InputData } from "../domain/Todo";

export type CreateTodoUC = (inputData: InputData) => void;

export interface ApiService {
  save: (todo: Todo) => Promise<void>;
  read: () => Promise<Todo[]>;
  update: (todo: Todo) => Promise<void>;
  delete: (id: Todo["id"]) => Promise<void>;
}

export interface StoreService {
  save: (todo: Todo) => void;
  set: (todos: Todo[]) => void;
  delete: (id: Todo["id"]) => void;
  update: (todo: Todo) => void;
  getById: (id: Todo["id"]) => Todo | undefined;
}

export interface NotificationService {
  notify: (message: string) => void;
}
