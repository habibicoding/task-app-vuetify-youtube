<script setup lang="ts">
import {reactive, ref} from "vue";
import {Priority, TaskUpdateRequest} from "@/dtos/taskDtos";
import {useTaskStore} from "@/store/taskStore";
import {useField} from "vee-validate";
import {MIN_TASK_DESCRIPTION} from "@/constants/appConstants";

const priorities = ref([
  Priority[Priority.LOW],
  Priority[Priority.MEDIUM],
  Priority[Priority.HIGH]
]);

const taskStore = useTaskStore();

const request = reactive<TaskUpdateRequest>({
  description: taskStore.taskToEdit.description,
  isReminderSet: taskStore.taskToEdit.isReminderSet,
  isTaskOpen: taskStore.taskToEdit.isTaskOpen,
  priority: taskStore.taskToEdit.priority
});

const description = useField('description');

const emits = defineEmits(['updated-task', 'abort-clicked']);

const handleSubmit = () => {
  if (request.description.length >= MIN_TASK_DESCRIPTION) {
    emits('updated-task', taskStore.taskToEdit.id, request);
  } else {
    description.errorMessage.value = 'Description needs to be at least 3 characters long';
  }
}

const handleAbort = () => {
  emits('abort-clicked');
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="request.description"
      :counter="10"
      :error-messages="description.errorMessage.value"
      label="Description"
    />

    <v-checkbox v-model="request.isReminderSet" label="Reminder" type="checkbox"/>

    <v-checkbox v-model="request.isTaskOpen" label="Open" type="checkbox"/>

    <v-select
      v-model="request.priority" :items="priorities" label="Priority"/>

    <v-btn class="mb-4 clear-btn" @click="handleAbort">abort</v-btn>

    <v-btn class="mb-4 submit-btn" type="submit">update</v-btn>

  </form>
</template>
