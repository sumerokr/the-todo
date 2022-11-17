import { readonly, ref } from "vue";
import without from "lodash/without";
import type { StoreService } from "@/application/ports";
import type { Todo } from "../domain/Todo";

// TODO: move the store itself to a separate file
const todos = ref<Todo[]>([]);
console.log("todos", todos);
const roTodos = readonly(todos);
console.log("roTodos", roTodos);

export { roTodos as todos };

export const storeService: StoreService = {
  create: (todo) => {
    todos.value.push(todo);
  },
  set: (_todos) => {
    todos.value = _todos;
  },
  delete: (todo) => {
    todos.value = todos.value.filter((_todo) => {
      console.log(_todo, todo, _todo === todo);
    });
  },
};
