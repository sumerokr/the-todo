import { ref } from "vue";
import { createTodo as _createTodo } from "@/application/create-todo";

const status = ref("idle");
const createTodo = async (options: Parameters<typeof _createTodo>[0]) => {
  status.value = "pending";
  await _createTodo(options);
  status.value = "success";
};

export const useCreateTodo = () => {
  return {
    createTodo,
    status,
  };
};
