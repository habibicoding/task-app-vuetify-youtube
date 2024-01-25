import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import {webService} from "../src/services/taskApi";
import {server} from "../src/setupTests";
import {ref, Ref} from "vue";
import {AxiosError} from "axios";
import {editTask} from "../src/composables/editTask";
import {mockTaskUpdateRequest} from "./helper/mockResponse";

// Start the server before all tests in this file
beforeAll(() => server.listen());

// Close the server after all tests in this file
afterAll(() => server.close());

describe('Unit Tests for editTask composable', () => {
  // assign
  const id = 1;
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToTasksView = vi.fn();

  it('when update task is called then expect success case', async () => {
    // act
    webService.createTask = async () => ({data: mockTaskUpdateRequest});
    await editTask(id, mockTaskUpdateRequest, isLoading, isNetworkError, axiosError, navigateToTasksView);

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
    expect(navigateToTasksView).toHaveBeenCalled();
  });

  it('when update task is called then expect network error', async () => {
    // assign
    const errorMessage = 'Network error';
    const actualError = new AxiosError(errorMessage);
    webService.updateTask = vi.fn(() => Promise.reject(actualError));

    // act
    await editTask(id, mockTaskUpdateRequest, isLoading, isNetworkError, axiosError, navigateToTasksView);

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(actualError);
    expect(actualError.message).toBe(errorMessage);
  });
});
