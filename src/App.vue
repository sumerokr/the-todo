<script setup lang="ts">
import { ref } from "vue";
import { useSaveTodo } from "./composables/use-save-todo";
import { useGetTodos } from "./composables/use-get-todos";
import { useDeleteTodo } from "./composables/use-delete-todo";
import { useToggleTodo } from "./composables/use-toggle-todo";

const {
  todos,
  isReady: isReadTodosReady,
  isLoading: isReadTodosLoading,
  execute: readTodos,
} = useGetTodos();
readTodos();

const { isLoading: isSaveTodoLoading, execute: saveTodo } = useSaveTodo();

const { execute: deleteTodo, deletingIds } = useDeleteTodo();

const { execute: toggleTodo, togglingIds } = useToggleTodo();

const title = ref("");

const onSubmit = () => {
  saveTodo(title.value);
  title.value = "";
};
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="title" type="text" />
      <button type="submit" :disabled="isSaveTodoLoading">add</button>
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
