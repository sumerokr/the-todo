import type { Todo } from "../domain/Todo";

export interface ApiService {
  create: (todo: Todo) => Promise<void>;
  read: () => Promise<Todo[]>;
  delete: (todo: Todo) => Promise<void>;
}

export interface StoreService {
  create: (todo: Todo) => void;
  set: (todos: Todo[]) => void;
  delete: (todo: Todo) => void;
}

export interface NotificationService {
  notify: (message: string) => void;
}
