export interface Todo {
  id: string;
  title: string;
  createdAt: string;
  isComplete: boolean;
}

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
