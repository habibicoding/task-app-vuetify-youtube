import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import {Ref, ref} from "vue";
import {AxiosError} from "axios";
import {server} from "../src/setupTests";
import {removeTask} from "../src/composables/removeTask";
import {webService} from "../src/services/taskApi";
import {TaskState} from "../src/dtos/taskDtos";


// Start the server before all tests in this file
beforeAll(() => server.listen());

// Close the server after all tests in this file
afterAll(() => server.close());

describe('Unit Tests for removeTask composable', () => {
  // assign
  const id = 1;
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const fetchTasks = vi.fn();
  const taskType = TaskState[TaskState.OPEN];

  it('when delete task is called then expect success path', async () => {
    // assign
    webService.deleteTask = async () => ({});

    // act
    await removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskType);

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(fetchTasks).toHaveBeenCalled();
  });

  it('when delete task is called then expect network error', async () => {
    // assign
    const errorMessage = 'Network error';
    const actualError = new AxiosError(errorMessage);
    webService.deleteTask = vi.fn(() => Promise.reject(actualError));

    // act
    await removeTask(id, isLoading, isNetworkError, axiosError, fetchTasks, taskType);

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(actualError);
    expect(actualError.message).toEqual(errorMessage);
  });
});
