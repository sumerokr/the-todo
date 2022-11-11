import { ref } from "vue";
import { readTodos as _readTodos } from "@/application/read-todos";
import { todos } from "@/services/store-service";

const status = ref("idle");
const readTodos = async () => {
  status.value = "pending";
  await _readTodos();
  status.value = "success";
};

export const useReadTodos = () => {
  return {
    todos,
    readTodos,
    status,
  };
};
