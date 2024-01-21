import {useTaskStore} from "@/store/taskStore";
import {ALL_TASKS, CLOSED_TASKS, HOME_VIEW, OPEN_TASKS} from "@/constants/appConstants";
import {TaskState} from "@/dtos/taskDtos";
import router from "@/router";

export function useTaskNavigation() {

  const taskStore = useTaskStore();

  const handleTaskTypeSelected = (taskType: string): void => {
    switch (taskType) {
      case OPEN_TASKS:
        taskStore.selectedTaskType = TaskState[TaskState.OPEN];
        break;
      case CLOSED_TASKS:
        taskStore.selectedTaskType = TaskState[TaskState.CLOSED];
        break;
      case ALL_TASKS:
        taskStore.selectedTaskType = '';
        break;
    }
    navigateToTaskView();
  }

  const navigateToTaskView = (): void => {
    router.replace({name: HOME_VIEW}).then();
  }

  const logoClicked = (): void => {
    taskStore.selectedTaskType = TaskState[TaskState.OPEN];
    router.replace({name: HOME_VIEW}).then();
  }

  return {
    handleTaskTypeSelected,
    navigateToTaskView,
    logoClicked
  }
}
