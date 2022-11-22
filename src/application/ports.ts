import type { Todo } from "../domain/Todo";

export interface ApiService {
  create: (todo: Todo) => Promise<void>;
  read: () => Promise<Todo[]>;
  delete: (id: Todo["id"]) => Promise<void>;
  update: (todo: Todo) => Promise<void>;
}

export interface StoreService {
  create: (todo: Todo) => void;
  set: (todos: Todo[]) => void;
  delete: (id: Todo["id"]) => void;
  getById: (id: Todo["id"]) => Todo | undefined;
  update: (todo: Todo) => void;
}

export interface NotificationService {
  notify: (message: string) => void;
}
