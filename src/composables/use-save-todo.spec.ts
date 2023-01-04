import { describe, it, expect, vi } from "vitest";
import { useSaveTodo } from "./use-save-todo";
import { saveTodo } from "@/application/save-todo";

vi.mock("@/application/save-todo");

describe("useSaveTodo", () => {
  it("has default state", () => {
    const { isReady, isLoading } = useSaveTodo();

    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(false);
    expect(saveTodo).not.toHaveBeenCalled();
  });

  it("reacts to execute", async () => {
    const { isReady, isLoading, execute } = useSaveTodo();

    const promise = execute("test title");
    expect(isLoading.value).toBe(true);
    // TODO: extract assertion
    expect(saveTodo).toHaveBeenLastCalledWith("test title");
    await promise;
    expect(isReady.value).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
