import {TaskUpdateRequest} from "@/dtos/taskDtos";
import {Ref} from "vue";
import {AxiosError} from "axios";
import {webService} from "@/services/taskApi";
import logRequestError from "@/composables/logRequestError";

export async function removeTask(
  id: number,
  isLoading: Ref<boolean>,
  isNetworkError: Ref<boolean>,
  axiosError: Ref<AxiosError | unknown>,
  fetchTasks: (taskType: string) => Promise<void>,
  taskType: string
): Promise<void> {
  isLoading.value = true;
  isNetworkError.value = false;
  await webService.deleteTask(id)
    .then(() => {
      fetchTasks(taskType);
      isLoading.value = false;
    })
    .catch((err: AxiosError | unknown) => {
      logRequestError('removeTask', err);
      axiosError.value = err instanceof AxiosError ? err : undefined;
      isNetworkError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
