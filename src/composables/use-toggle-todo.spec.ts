import { describe, it, expect, vi } from "vitest";
import { useToggleTodo } from "./use-toggle-todo";
import { toggleTodo } from "@/application/toggle-todo";

vi.mock("@/application/toggle-todo");

describe("useToggleTodo", () => {
  it("has default state", () => {
    const { isReady, isLoading, togglingIds } = useToggleTodo();

    expect(togglingIds.value).toEqual([]);
    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(false);
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it("reacts to execute", async () => {
    const { isReady, isLoading, togglingIds, execute } = useToggleTodo();

    // TODO: extract assertion
    const promise = execute("test-id");
    expect(togglingIds.value).toEqual(["test-id"]);
    expect(isLoading.value).toBe(true);
    expect(toggleTodo).toHaveBeenLastCalledWith("test-id");
    await promise;
    expect(togglingIds.value).toEqual([]);
    expect(isReady.value).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
