import type { Todo } from "../domain/Todo";

export interface ApiService {
  create: (todo: Todo) => Promise<void>;
}

export interface StoreService {
  create: (todo: Todo) => void;
}

export interface NotificationService {
  notify: (message: string) => void;
}
