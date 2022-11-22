<script setup lang="ts">
import { ref } from "vue";
import { useCreateTodo } from "./composables/use-create-todo";
import { useReadTodos } from "./composables/use-read-todos";
import { useDeleteTodo } from "./composables/use-delete-todo";
import { useToggleTodo } from "./composables/use-toggle-todo";
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

const { execute: toggleTodo, togglingIds } = useToggleTodo();

const title = ref("");

const onSubmit = () => {
  createTodo({ title: title.value });
  title.value = "";
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
        <input
          type="checkbox"
          :disabled="togglingIds.includes(todo.id)"
          :checked="todo.isComplete"
          @change="toggleTodo(todo.id)"
        />
        {{ todo.title }}
        <button
          :disabled="deletingIds.includes(todo.id)"
          @click="deleteTodo(todo.id)"
        >
          ✕
        </button>
      </li>
    </ul>

    <p v-else-if="isReadTodosLoading">Pending...</p>
  </div>
</template>

<style scoped></style>
