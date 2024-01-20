<script setup lang="ts">
import {useDisplay} from "vuetify";
import {computed, ref} from "vue";
import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS, TASK_CREATE_VIEW} from "@/constants/appConstants";
import router from "@/router";

const display = useDisplay();

const isMobileDevice = computed(() => {
  return display.mobile;
})

const links: string[] = [OPEN_TASKS, CLOSED_TASKS, ALL_TASKS];
const isDrawerActive = ref(false);
const selectedLink = ref('');

const emit = defineEmits(['task-type-selected', 'logo-clicked']);

const selectedTaskType = (taskType: string) => {
  selectedLink.value = taskType;
  emit('task-type-selected', taskType);
  isDrawerActive.value = false;
}

const logoClicked = () => {
  emit('logo-clicked');
}

const createTask = () => {
  router.push({name: TASK_CREATE_VIEW}).then();
  isDrawerActive.value = false;
}

</script>

<template>

</template>

<style scoped>

</style>
