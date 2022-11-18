<script setup lang="ts">
import { ref } from "vue";
import { useCreateTodo } from "./composables/use-create-todo";
import { useReadTodos } from "./composables/use-read-todos";
import { useDeleteTodo } from "./composables/use-delete-todo";
import type { Todo } from "./domain/Todo";

const {
  todos,
  isReady: isReadTodosReady,
  isLoading: isReadTodosLoading,
  execute: readTodos,
} = useReadTodos();
readTodos();

const { isLoading: isCreateTodoLoading, execute: createTodo } = useCreateTodo();

const { execute: deleteTodo, deletingIds } = useDeleteTodo();

const title = ref("");

const onSubmit = () => {
  createTodo({ title: title.value });
  title.value = "";
};

const onDelete = (id: Todo["id"]) => {
  deleteTodo(id);
};
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="title" type="text" />
      <button type="submit" :disabled="isCreateTodoLoading">add</button>
    </form>

    <ul v-if="isReadTodosReady && todos.length">
      <li v-for="todo of todos" :key="todo.id">
        {{ todo.title }}
        <button
          :disabled="deletingIds.includes(todo.id)"
          @click="onDelete(todo.id)"
        >
          ✕
        </button>
      </li>
    </ul>

    <p v-else-if="isReadTodosLoading">Pending...</p>
  </div>
</template>

<style scoped></style>
