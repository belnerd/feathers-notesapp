<template>
  <v-app id="app">
    <v-banner elevation="5">
      <v-row>
        <v-col>notesApp</v-col>
        <v-col class="text-right"
          ><v-btn v-if="user" @click="logout" elevation="2" small
            >Logout</v-btn
          ></v-col
        >
      </v-row>
    </v-banner>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { onMounted, watch, computed } from "@vue/composition-api";
export default {
  name: "App",
  setup(props, context) {
    const { $store, $router } = context.root;
    // Redirect to notes if there's a user, otherwise to login page.
    watch(
      () => $store.state.auth.user,
      (user) => {
        const toRouteName = user ? "Notes" : "Login";
        $router.replace({ name: toRouteName });
      },
      { lazy: true }
    );
    // Attempt jwt auth when the app mounts.
    onMounted(() => {
      $store.dispatch("auth/authenticate").catch((error) => {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error.message);
        }
      });
    });
    // User
    const user = computed(() => $store.state.auth.user);
    // Logout
    function logout() {
      return $store.dispatch("auth/logout");
    }
    return { user, logout };
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
