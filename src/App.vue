<script setup lang="ts">
import { ref } from "vue";
import { useCreateTodo } from "./composables/use-create-todo";
import { useReadTodos } from "./composables/use-read-todos";

const {
  todos,
  isReady: isReadTodosReady,
  isLoading: isReadTodosLoading,
  execute: readTodos,
} = useReadTodos();
readTodos();

const {
  isReady: isCreateTodoReady,
  isLoading: isCreateTodoLoading,
  execute: createTodo,
} = useCreateTodo();

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
      <li v-for="todo of todos" :key="todo.id">{{ todo.title }}</li>
    </ul>

    <p v-else-if="isReadTodosLoading">Pending...</p>
  </div>
</template>

<style scoped></style>
