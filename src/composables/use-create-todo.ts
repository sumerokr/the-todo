import { useAsyncState } from "@vueuse/core";
import { createTodo } from "@/application/create-todo";

export const useCreateTodo = () => {
  const { isReady, isLoading, execute } = useAsyncState(createTodo, null, {
    immediate: false,
  });
  return {
    isReady,
    isLoading,
    execute: (...args: Parameters<typeof createTodo>) => execute(0, ...args),
  };
};
