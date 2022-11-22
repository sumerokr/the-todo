export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  isComplete: boolean;
}

export type DraftTodo = Pick<Todo, "title">;

export const createTodo = (draft: {
  id: Todo["id"];
  title: Todo["title"];
  createdAt: Todo["createdAt"];
}): Todo => {
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
