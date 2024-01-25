import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import {AxiosError} from "axios";
import {mockTaskFetchResponse} from "./helper/mockResponse";
import {webService} from "../src/services/taskApi";
import {server} from "../src/setupTests";
import {getTasks} from "../src/composables/getTasks";

// Start the server before all tests in this file
beforeAll(() => server.listen());

// Close the server after all tests in this file
afterAll(() => server.close());

describe('Unit Tests for getTasks composable', () => {
  it('when getTasks is called then expect response to be equal to mockFetchResponse', async () => {
    // assign
    webService.getTasks = async () => ({data: mockTaskFetchResponse});
    const {fetchTasks, tasks, isLoading, isNetworkError, axiosError} = getTasks();

    // act
    await fetchTasks('');

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(tasks).toEqual(mockTaskFetchResponse);
  });
  it('when getTasks is called then expect error case', async () => {
    // assign
    const errorMessage = 'Network error';
    const actualError = new AxiosError(errorMessage);
    webService.getTasks = vi.fn(() => Promise.reject(actualError));
    const {fetchTasks, tasks, isLoading, isNetworkError, axiosError} = getTasks();

    // act
    await fetchTasks('');

    // expect
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(actualError);
    expect(actualError.message).toBe(errorMessage);
  });
});
