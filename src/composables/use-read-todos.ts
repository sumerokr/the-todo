import { useAsyncState } from "@vueuse/core";
import { readTodos } from "@/application/get-todos";
import { todos } from "@/services/store-service-composition";

export const useReadTodos = () => {
  const { isReady, isLoading, execute } = useAsyncState(readTodos, null, {
    immediate: false,
  });
  return {
    todos,
    isReady,
    isLoading,
    execute,
  };
};
