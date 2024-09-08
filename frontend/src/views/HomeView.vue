<template>
  <v-container class="main-view">
    <v-row>
      <v-col>
        <TodoList />
      </v-col>
    </v-row>
    <TodoPage />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoPage from '../components/TodoPage.vue';
import TodoList from '../components/TodoList.vue';

export default defineComponent({
  components: {
    TodoPage,
    TodoList
  }
});
</script>

<style scoped>
.main-view {
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
