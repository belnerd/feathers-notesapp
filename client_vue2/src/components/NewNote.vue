<template>
  <v-container fluid>
    <v-flex>
      <v-form @submit.prevent="onSubmit">
        <v-textarea v-model="note.text" label="New note" outlined />
        <v-btn type="submit">Add</v-btn>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "NewNote",
  setup(props, context) {
    const { Note } = context.root.$FeathersVuex.api;
    const note = ref(new Note({ text: "" }));

    function resetInput() {
      note.value = new Note({ text: "" });
    }

    function onSubmit() {
      if (!note.value.text) {
        return;
      }
      note.value.save();
      resetInput();
    }

    return {
      note,
      resetInput,
      onSubmit,
    };
  },
};
</script>
