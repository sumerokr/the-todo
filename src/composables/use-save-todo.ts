import { useAsyncState } from "@vueuse/core";
import { saveTodo } from "@/application/save-todo";

export const useSaveTodo = () => {
  const { isReady, isLoading, execute } = useAsyncState(saveTodo, null, {
    immediate: false,
  });
  return {
    isReady,
    isLoading,
    execute: (...args: Parameters<typeof saveTodo>) => execute(0, ...args),
  };
};
