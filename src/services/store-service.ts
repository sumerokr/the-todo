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
};
