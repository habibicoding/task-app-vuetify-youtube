import {defineStore} from "pinia";
import {TaskFetchResponse, TaskState} from "@/dtos/taskDtos";


export const useTaskStore = defineStore('task', {
  state: () => ({
    taskToEdit: Object as TaskFetchResponse | unknown,
    selectedTaskType: TaskState[TaskState.OPEN]
  }),
  actions: {
    setTaskToEdit(task: TaskFetchResponse) {
      this.taskToEdit = task;
    },
    setSelectedTaskType(taskType: string) {
      this.selectedTaskType = taskType;
    }
  }
})
