import { readonly, ref } from "vue";
import type { StoreService } from "@/application/ports";
import type { Todo } from "../domain/Todo";

// TODO: move the store itself to a separate file
const todos = ref<Todo[]>([]);
const roTodos = readonly(todos);

export { roTodos as todos };

export const storeService: StoreService = {
  create: (todo) => {
    todos.value.push(todo);
  },
  set: (_todos) => {
    todos.value = _todos;
  },
  delete: (id) => {
    todos.value = todos.value.filter((_todo) => _todo.id !== id);
  },
  getById: (id) => {
    return todos.value.find((todo) => todo.id === id);
  },
  update: (todo) => {
    const index = todos.value.findIndex((_todo) => _todo.id === todo.id);
    todos.value.splice(index, 1, todo);
  },
};
