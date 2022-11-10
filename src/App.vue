<script setup lang="ts">
import { ref } from "vue";
import { createTodo } from "./application/create-todo";
import { readTodos } from "./application/read-todo";
import { todos } from "./services/store-service";

readTodos();

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
      <button type="submit">add</button>
    </form>

    <ul v-if="todos.length">
      <li v-for="todo of todos" :key="todo.id">{{ todo.title }}</li>
    </ul>

    <p v-else>Loading...</p>
  </div>
</template>

<style scoped></style>
