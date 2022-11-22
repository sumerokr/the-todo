import { useAsyncState } from "@vueuse/core";
import { createTodo } from "@/application/create-todo";
import type { InputData } from "../domain/Todo";

export const useCreateTodo = () => {
  const { isReady, isLoading, execute } = useAsyncState(createTodo, null, {
    immediate: false,
  });
  return {
    isReady,
    isLoading,
    execute: (todo: InputData) => execute(0, todo),
  };
};
