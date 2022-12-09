import { describe, it, expect } from "vitest";

import type { Todo, DraftTodo } from "./Todo";
import { createTodo, toggleTodo } from "./Todo";

describe("createTodo", () => {
  it("adds `isComplete` flag that is `false` by default", () => {
    const draft: DraftTodo = {
      id: "123",
      title: "test",
      createdAt: new Date().toISOString(),
    };
    const todo = createTodo(draft);
    expect(todo).toEqual({
      ...draft,
      isComplete: false,
    });
  });
});

describe("toggleTodo", () => {
  it("toggles `isComplete` flag", () => {
    const todo: Todo = {
      id: "123",
      title: "test",
      createdAt: new Date().toISOString(),
      isComplete: false,
    };
    const toggled = toggleTodo(todo);
    expect(toggled).toEqual({
      ...todo,
      isComplete: !todo.isComplete,
    });
  });
});
