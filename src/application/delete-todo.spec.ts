import { describe, it, expect, vi } from "vitest";
import { deleteTodo } from "./delete-todo";
import { apiService } from "@/services/api-service-local-storage";

import type { Todo, DraftTodo } from "@/domain/Todo";
import { createTodo, toggleTodo } from "@/domain/Todo";

vi.mock("@/services/api-service-local-storage", () => ({
  delete: vi.fn(),
}));

describe("deleteTodo", () => {
  it("calls apiService", () => {
    deleteTodo("test-id");

    expect(todo).toEqual({
      ...draft,
      isComplete: false,
    });
  });
});
