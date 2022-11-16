import { useAsyncState } from "@vueuse/core";
import { readTodos } from "@/application/read-todos";
import { todos } from "@/services/store-service";

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
