import { useAsyncState } from "@vueuse/core";
import { getTodos } from "@/application/get-todos";
import { todos } from "@/services/store-service-composition";

export const useGetTodos = () => {
  const { isReady, isLoading, execute } = useAsyncState(getTodos, null, {
    immediate: false,
  });
  return {
    todos,
    isReady,
    isLoading,
    execute,
  };
};
