import { useAsyncState } from "@vueuse/core";
import without from "lodash/without";
import { deleteTodo } from "@/application/delete-todo";
import { ref } from "vue";
import type { Todo } from "@/domain/Todo";

export const useDeleteTodo = () => {
  const { isReady, isLoading, execute } = useAsyncState(deleteTodo, null, {
    immediate: false,
  });
  const deletingIds = ref<Todo["id"][]>([]);
  return {
    deletingIds,
    isReady,
    isLoading,
    execute: async (id: Todo["id"]) => {
      deletingIds.value.push(id);
      await execute(0, id);
      deletingIds.value = without(deletingIds.value, id);
    },
  };
};
