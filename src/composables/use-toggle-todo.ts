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
    execute: async (id: Todo["id"]) => {
      togglingIds.value.push(id);
      await execute(0, id);
      togglingIds.value = without(togglingIds.value, id);
    },
  };
};
