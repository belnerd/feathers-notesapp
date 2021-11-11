<template>
  <v-container>
    <v-row v-if="user">
      <v-col>
        <v-hover
          v-for="note in notes"
          :key="note._id"
          v-slot="{ hover }"
          close-delay="100"
        >
          <v-card v-if="note.userId === user._id"
            :elevation="hover ? 4 : 2"
            :class="{ 'on-hover': hover }"
            class="mb-5"
          >
            <v-row>
              <v-col cols="10"
                ><v-card-text>{{ note.text }}</v-card-text></v-col
              >
              <v-col class="text-right mr-2"
                ><v-icon v-if="hover" @click="deleteNote(note._id)"
                  >mdi-delete</v-icon
                ></v-col
              >
            </v-row>
            <v-card-text>{{ note.createdAt }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col>
        <NewNote />
      </v-col>
    </v-row>
    <v-row v-if="!user">
      <router-link to="/">Login</router-link>
    </v-row>
  </v-container>
</template>

<script>
import { useFind } from "feathers-vuex";
import { computed } from "@vue/composition-api";
import NewNote from "../components/NewNote.vue";

export default {
  name: "Notes",
  components: {
    NewNote,
  },
  setup(props, context) {
    const { Note } = context.root.$FeathersVuex.api;
    const { $store } = context.root;
    // User
    const user = computed(() => $store.state.auth.user);
    // Notes
    const notesParams = computed(() => {
      return {
        query: {
          $sort: { createdAt: 1 },
          $limit: 25,
        },
      };
    });
    const { items: notes } = useFind({
      model: Note,
      params: notesParams,
    });
    function deleteNote(id) {
      $store.dispatch('notes/remove', id)
    }
    return {
      user,
      notes,
      deleteNote,
    };
  },
};
</script>
