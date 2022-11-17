import type { ApiService } from "@/application/ports";
import type { Todo } from "../domain/Todo";

const lsKey = "__the-todo__todos";

const delay = (ms: number = Math.random() * 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const apiService: ApiService = {
  create: async (todo) => {
    await delay();
    const data = localStorage.getItem(lsKey);
    // TODO: handle errors
    const todos = JSON.parse(data ?? "[]") as Todo[];
    todos.push(todo);
    // TODO: handle errors
    localStorage.setItem(lsKey, JSON.stringify(todos));
  },
  read: async () => {
    await delay();
    const data = localStorage.getItem(lsKey);
    // TODO: handle errors
    return JSON.parse(data ?? "[]") as Todo[];
  },
  delete: async (todo) => {
    await delay();
    const data = localStorage.getItem(lsKey);
    // TODO: handle errors
    const todos = JSON.parse(data ?? "[]") as Todo[];
    const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
    // TODO: handle errors
    localStorage.setItem(lsKey, JSON.stringify(newTodos));
  },
};
