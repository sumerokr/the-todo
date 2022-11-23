import { useAsyncState } from "@vueuse/core";
import { ref } from "vue";
import without from "lodash/without";
import { toggleTodo } from "@/application/toggle-todo";
import type { Todo } from "../domain/Todo";

export const useToggleTodo = () => {
  const { isReady, isLoading, execute } = useAsyncState(toggleTodo, null, {
    immediate: false,
  });

  const togglingIds = ref<Todo["id"][]>([]);
  return {
    togglingIds,
    isReady,
    isLoading,
    execute: async (...args: Parameters<typeof toggleTodo>) => {
      togglingIds.value.push(args[0]);
      await execute(0, ...args);
      togglingIds.value = without(togglingIds.value, args[0]);
    },
  };
};
