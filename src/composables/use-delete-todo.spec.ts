import { describe, it, expect, vi } from "vitest";
import { useDeleteTodo } from "./use-delete-todo";
import { deleteTodo } from "@/application/delete-todo";

vi.mock("@/application/delete-todo");

describe("useDeleteTodo", () => {
  it("has default state", () => {
    const { deletingIds, isReady, isLoading } = useDeleteTodo();

    expect(deletingIds.value).toEqual([]);
    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(false);
    expect(deleteTodo).not.toHaveBeenCalled();
  });

  it("reacts to execute", async () => {
    const { deletingIds, isReady, isLoading, execute } = useDeleteTodo();

    const promise = execute("test-id");
    expect(deletingIds.value).toEqual(["test-id"]);
    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(true);
    // TODO: extract assertion
    expect(deleteTodo).toHaveBeenLastCalledWith("test-id");
    await promise;
    expect(deletingIds.value).toEqual([]);
    expect(isReady.value).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
