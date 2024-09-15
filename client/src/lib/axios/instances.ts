import axios from "axios";
import {
  requestInterceptorFulfill,
  requestInterceptorReject,
  responseInterceptorFulfill,
  responseInterceptorReject,
} from "./interceptors";

export const AxiosInstance = axios.create({
  baseURL: "http://192.168.1.2:4000/api",
  withCredentials: true,
});

export const PublicAxios = axios.create({
  baseURL: "http://192.168.1.2:4000/api",
  withCredentials: true,
});

export const ProtectedAxios = axios.create({
  baseURL: "http://192.168.1.2:4000/api",
  withCredentials: true,
});

ProtectedAxios.interceptors.request.use(
  requestInterceptorFulfill,
  requestInterceptorReject
);
ProtectedAxios.interceptors.response.use(
  responseInterceptorFulfill,
  responseInterceptorReject
);
