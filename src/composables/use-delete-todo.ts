import { useAsyncState } from "@vueuse/core";
import without from "lodash/without";
import { deleteTodo } from "@/application/delete-todo";
import { ref } from "vue";
import type { Todo } from "@/domain/Todo";

export const useDeleteTodo = () => {
  const { isReady, isLoading, execute } = useAsyncState(deleteTodo, null, {
    immediate: false,
  });
  const deletingIds = ref<Todo[]>([]);
  return {
    deletingIds,
    isReady,
    isLoading,
    execute: async (todo: Todo) => {
      deletingIds.value.push(todo);
      await execute(0, todo);
      deletingIds.value = without(deletingIds.value, todo);
    },
  };
};
