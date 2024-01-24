import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {HTTP_STATUS_CODES} from "../src/constants/appConstants";
import {webService} from "../src/services/taskApi";
import {Priority, TaskCreateRequest, TaskUpdateRequest} from "../src/dtos/taskDtos";
import {server} from "../src/setupTests";
import {rest} from "msw";

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

  it('when delete task request is send then expect 204 back', async () => {
    // assign & act
    const response = await webService.deleteTask(102);
    expect(response.status).toBe(204);
  });

  it('when updating a task then expect properties of response equal to request properties', async () => {
    // assign
    const dummyRequest: TaskUpdateRequest = {
      description: "buy groceries",
      isReminderSet: false,
      isTaskOpen: true,
      priority: "HIGH"
    }

    // act
    const response = await webService.updateTask(1948, dummyRequest);

    // expect
    expect(response.status).toBe(HTTP_STATUS_CODES.OK);
    expect(response.data.description).toEqual(dummyRequest.description);
    expect(response.data.isReminderSet).toEqual(dummyRequest.isReminderSet);
    expect(response.data.isTaskOpen).toEqual(dummyRequest.isTaskOpen);
    expect(response.data.priority).toEqual(dummyRequest.priority);
  });

  it('when bad request is send then expect 400 back', async () => {
    // assign
    server.use(
      rest.patch('https://backend4vue.onrender.com/api/v1/tasks/:id', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({message: 'Bad Request'}));
      })
    );
    const dummyRequest: TaskUpdateRequest = {
      description: "",
      isReminderSet: false,
      isTaskOpen: true,
      priority: ""
    }

    // act
    let errorResponse;
    try {
      await webService.updateTask(12, dummyRequest);
    } catch (error) {
      errorResponse = error;
    }

    // expect
    expect(errorResponse).toBeDefined();
    expect(errorResponse.response.status).toBe(400);
    expect(errorResponse.response.data.message).toBe('Bad Request');
  });

  it('when request is send then expect 500 back', async () => {
    // assign
    server.use(
      rest.post('https://backend4vue.onrender.com/api/v1/tasks', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: 'Internal Server Error'}));
      })
    );
    const dummyRequest: TaskCreateRequest = {
      description: "",
      isReminderSet: false,
      isTaskOpen: true,
      priority: ""
    }

    // act
    let errorResponse;
    try {
      await webService.createTask(dummyRequest);
    } catch (error) {
      errorResponse = error;
    }

    // expect
    expect(errorResponse).toBeDefined();
    expect(errorResponse.response.status).toBe(500);
    expect(errorResponse.response.data.message).toBe('Internal Server Error');
  });
});
