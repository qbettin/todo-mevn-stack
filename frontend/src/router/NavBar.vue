<template>
  <v-app-bar app>
    <v-container>
      <v-row align="center" justify="space-between">
        <!-- Left side: Task Manager title with icon -->
        <v-col cols="auto" class="d-flex align-center">
          <v-icon color="black">mdi-calendar-check</v-icon> <!-- Replace mdi-task with the desired icon -->
          <v-toolbar-title>Task Manager</v-toolbar-title>
        </v-col>

        <!-- Right side: Login and Register buttons -->
        <v-col cols="auto" class="d-flex justify-end">
          <v-btn v-show="isLoginOrRegisterPage" to="/" text>Login</v-btn>
          <v-btn v-show="isLoginOrRegisterPage" to="/register" text>Register</v-btn>
          <v-btn @click="toggleTheme" icon>
            <v-icon>{{ isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';

export default defineComponent({
  setup() {
    const theme = useTheme();
    const router = useRouter();
    const isLoginOrRegisterPage = computed(() => {
      const path = router.currentRoute.value.path;
      return path === '/' || path === '/register';
    });
    const isDarkMode = computed(() => theme.global.name.value === 'dark');
    function toggleTheme () {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
    return {
      router,
      isLoginOrRegisterPage,
      toggleTheme,
      isDarkMode,
    };
  },
});
</script>

<style scoped>
</style>
