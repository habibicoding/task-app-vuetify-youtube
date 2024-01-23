<script setup lang="ts">

import {useTaskNavigation} from "@/composables/useTaskNavigation";
import {ref} from "vue";
import {AxiosError} from "axios";
import router from "@/router";
import {TaskUpdateRequest} from "@/dtos/taskDtos";
import {editTask} from "@/composables/editTask";
import ErrorDialog from "@/components/ErrorDialog.vue";
import MainBackground from "@/components/MainBackground.vue";
import TaskCreateForm from "@/components/TaskCreateForm.vue";
import Navbar from "@/components/Navbar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import TaskUpdateForm from "@/components/TaskUpdateForm.vue";

defineProps({
  id: {
    type: String,
    required: true
  }
});

const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();
const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();

const clickedAbort = () => {
  router.back();
}

const updateTask = (id: number, request: TaskUpdateRequest) => {
  editTask(id, request, isLoading, isNetworkError, axiosError, navigateToTasksView);
};

</script>

<template>
  <Navbar @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <MainBackground>
    <TaskUpdateForm @updated-task="updateTask" @abort-clicked="clickedAbort"/>
    <LoadingSpinner :is-loading="isLoading"/>
    <ErrorDialog :model-value="isNetworkError" :axios-error="axiosError"/>
  </MainBackground>
</template>
