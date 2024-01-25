import {TaskUpdateRequest} from "@/dtos/taskDtos";
import {Ref} from "vue";
import {AxiosError} from "axios";
import {webService} from "@/services/taskApi";
import logRequestError from "@/composables/logRequestError";

export async function editTask(
  id: number,
  request: TaskUpdateRequest,
  isLoading: Ref<boolean>,
  isNetworkError: Ref<boolean>,
  axiosError: Ref<AxiosError | unknown>,
  navigateToTasksView: () => void
): Promise<void> {
  isLoading.value = true;
  isNetworkError.value = false;
  await webService.updateTask(id, request)
    .then(() => {
      isLoading.value = false;
      navigateToTasksView();
    })
    .catch((err: AxiosError | unknown) => {
      logRequestError('editTask', err);
      axiosError.value = err instanceof AxiosError ? err : undefined;
      isNetworkError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
