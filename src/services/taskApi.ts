import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {HTTP_STATUS_CODES} from "@/constants/appConstants";
import {TaskCreateRequest, TaskUpdateRequest} from "@/dtos/taskDtos";

const baseUrl = 'https://backend4vue.onrender.com/api/v1/';
const api: AxiosInstance = axios.create({baseUrl});


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const {status} = error.response;
      if (status === HTTP_STATUS_CODES.BAD_REQUEST) {
        console.error('Bad Request: ', error.response.data);
      } else if (status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
        console.error('Internal Server Error: ', error.response.data);
      }
    } else {
      console.error('Error: ', error.message);
    }
    return Promise.reject(error);
  }
);

interface TaskService {
  getTasks: (status: string) => Promise<AxiosResponse>;
  createTask: (request: TaskCreateRequest) => Promise<AxiosResponse>;
  deleteTask: (id: number) => Promise<AxiosResponse>;
  updateTask: (id: number, request: TaskUpdateRequest) => Promise<AxiosResponse>;
}

export const webService: TaskService = {
  getTasks(status: string) {
    return api.get(`/tasks?status=${status}`)
  },
  createTask(request: TaskCreateRequest) {
    return api.post('/tasks', request)
  },
  deleteTask(id: number) {
    return api.delete(`/tasks/${id}`)
  },
  updateTask(id: number, request: TaskUpdateRequest) {
    return api.patch(`/tasks/${id}`, request)
  }
};
