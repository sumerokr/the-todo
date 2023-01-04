import { describe, it, expect, vi } from "vitest";
import { useGetTodos } from "./use-get-todos";
import { getTodos } from "@/application/get-todos";

vi.mock("@/application/get-todos");

describe("useGetTodos", () => {
  it("has default state", () => {
    const { isReady, isLoading } = useGetTodos();

    expect(isReady.value).toBe(false);
    expect(isLoading.value).toBe(false);
    expect(getTodos).not.toHaveBeenCalled();
  });

  it("reacts to execute", async () => {
    const { isReady, isLoading, execute } = useGetTodos();

    const promise = execute();
    expect(isLoading.value).toBe(true);
    // TODO: extract assertion
    expect(getTodos).toHaveBeenCalled();
    await promise;
    expect(isReady.value).toBe(true);
    expect(isLoading.value).toBe(false);
  });
});
