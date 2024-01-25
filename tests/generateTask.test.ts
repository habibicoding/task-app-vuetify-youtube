import {describe, expect, it, vi, beforeAll, afterAll} from 'vitest';
import {Ref, ref} from "vue";
import {AxiosError} from "axios";
import {generateTask} from "../src/composables/generateTask";
import {mockTaskCreateRequest} from "./helper/mockResponse";
import {webService} from "../src/services/taskApi";
import {server} from "../src/setupTests";

// Start the server before all tests in this file
beforeAll(() => server.listen());

// Close the server after all tests in this file
afterAll(() => server.close());

describe('Unit Tests for generateTask composable', () => {
  // assign
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToTasksView = vi.fn();

  it('when create task is called then expect success path', async () => {
    // assign
    webService.createTask = async () => ({data: mockTaskCreateRequest});

    // act
    await generateTask(mockTaskCreateRequest, isLoading, isNetworkError, axiosError, navigateToTasksView);

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBe(null);
    expect(navigateToTasksView).toHaveBeenCalled();
  });

  it('when create task is called then expect network error', async () => {
    // assign
    const errorMessage = 'Network error';
    const actualError = new AxiosError(errorMessage);
    webService.createTask = vi.fn(() => Promise.reject(actualError));

    // act
    await generateTask(mockTaskCreateRequest, isLoading, isNetworkError, axiosError, navigateToTasksView);

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(actualError);
    expect(actualError.message).toEqual(errorMessage);
  });
});
