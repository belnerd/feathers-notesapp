<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout aling-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form method="post" @submit.prevent="onSubmit(email, password)">
                <v-text-field
                  v-model="email"
                  type="email"
                  name="email"
                  label="Login"
                >
                </v-text-field>
                <v-text-field
                  v-model="password"
                  type="password"
                  name="password"
                  label="Password"
                ></v-text-field>
                <v-btn type="submit">Login</v-btn>
              </v-form>
              <v-card-text v-if="error"
                >{{ error.message }}
                <a href="javascript://" @click.prevent="dismissError"
                  >Dismiss error</a
                >
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
  name: "Login",
  setup(props, context) {
    const { $store } = context.root;
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    function onSubmit(email, password) {
      $store
        .dispatch("auth/authenticate", { strategy: "local", email, password })
        // Just use the returned error instead of mapping it from the store.
        .catch((err) => {
          // Convert the error to a plain object and add a message.
          let type = err.className;
          err = Object.assign({}, err);
          err.message =
            type === "not-authenticated"
              ? "Incorrect email or password. "
              : "An error prevented login. ";
          this.error = err;
        });
    }
    return {
      email,
      password,
      error,
      dismissError,
      onSubmit,
    };
  },
};
</script>
