export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  isComplete: boolean;
}

export type DraftTodo = Pick<Todo, "id" | "title" | "createdAt">;

export const createTodo = (draft: DraftTodo): Todo => {
  return {
    ...draft,
    isComplete: false,
  };
};

export const toggleTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    isComplete: !todo.isComplete,
  };
};
