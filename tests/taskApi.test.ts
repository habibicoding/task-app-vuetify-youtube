import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {HTTP_STATUS_CODES} from "../src/constants/appConstants";
import {webService} from "../src/services/taskApi";
import {Priority, TaskCreateRequest} from "../src/dtos/taskDtos";
import {server} from "../src/setupTests";

// Start the server before all tests in this file
beforeAll(() => server.listen());

// Close the server after all tests in this file
afterAll(() => server.close());

describe('Unit Tests for taskApi', () => {

  it('when fetch tasks is triggered then expect two items', async () => {
    // assign & act
    const response = await webService.getTasks('');

    // expect
    expect(response.status).toBe(HTTP_STATUS_CODES.OK);
    expect(response.data.length).toBe(2);
  });

  it('when creating a task then expect properties of response equal to request properties', async () => {
    // assign
    const dummyRequest: TaskCreateRequest = {
      description: "workout",
      isReminderSet: true,
      isTaskOpen: true,
      priority: Priority[Priority.MEDIUM]
    }

    // act
    const response = await webService.createTask(dummyRequest);

    // expect
    expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
    expect(response.data.description).toEqual(dummyRequest.description);
    expect(response.data.isReminderSet).toEqual(dummyRequest.isReminderSet);
    expect(response.data.isTaskOpen).toEqual(dummyRequest.isTaskOpen);
    expect(response.data.priority).toEqual(dummyRequest.priority);
  });
});
