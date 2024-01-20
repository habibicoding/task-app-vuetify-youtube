import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {HTTP_STATUS_CODES} from "@/constants/appConstants";

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
      } else {
        console.error('Error: ', error.message);
      }
    }
    return Promise.reject(error);
  }
);

