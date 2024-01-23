import {rest} from "msw";
import {mockTaskCreateRequest, mockTaskFetchResponse, mockTaskUpdateRequest} from "../tests/helper/mockResponse";
import {setupServer} from "msw/native";
import {afterAll, afterEach, beforeAll} from "vitest";

export const restHandlers = [
  // Add mock for successful GET call
  rest.get('https://backend4vue.onrender.com/api/v1/tasks', (req, res, ctx,) => {
    return res(ctx.status(200), ctx.json(mockTaskFetchResponse));
  }),
  // Add mock for successful POST call
  rest.post('https://backend4vue.onrender.com/api/v1/tasks', (req, res, ctx,) => {
    return res(ctx.status(201), ctx.json(mockTaskCreateRequest));
  }),
  // Add mock for successful POST call
  rest.patch('https://backend4vue.onrender.com/api/v1/tasks:id', (req, res, ctx,) => {
    return res(ctx.status(200), ctx.json(mockTaskUpdateRequest));
  }),
  // Add mock for successful DELETE call
  rest.delete('https://backend4vue.onrender.com/api/v1/tasks/:id', (req, res, ctx,) => {
    return res(ctx.status(204));
  }),
];

export const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

// Close server after all tests
afterAll(() => server.close());

// Reset server handlers after each test to isolate the tests from each other
afterEach(() => server.restoreHandlers());
