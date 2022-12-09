import { describe, it, expect } from "vitest";
import { useDeleteTodo } from "./use-delete-todo";

// export const useDeleteTodo = () => {
//   const { isReady, isLoading, execute } = useAsyncState(deleteTodo, null, {
//     immediate: false,
//   });
//   const deletingIds = ref<Todo["id"][]>([]);
//   return {
//     deletingIds,
//     isReady,
//     isLoading,
//     execute: async (...args: Parameters<typeof deleteTodo>) => {
//       deletingIds.value.push(args[0]);
//       await execute(0, ...args);
//       deletingIds.value = without(deletingIds.value, args[0]);
//     },
//   };
// };

describe("useDeleteTodo", () => {
  it("has default state", () => {
    const { deletingIds, isReady, isLoading } = useDeleteTodo();

    expect(deletingIds.value).toEqual([]);
    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(false);
  });

  it("reacts to execute", async () => {
    const { deletingIds, isReady, isLoading, execute } = useDeleteTodo();

    const promise = execute("test-id");
    expect(deletingIds.value).toEqual(["test-id"]);
    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(true);
    await promise;
    expect(deletingIds.value).toEqual([]);
    expect(isReady.value).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
