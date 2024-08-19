import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";

const storage = useAuthStorage();

export const requestInterceptorFulfill = async (
  config: InternalAxiosRequestConfig
) => {
  const accessToken = await storage.getItem<string>("accessToken");
  const refreshToken = await storage.getItem<string>("refreshToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers["x-refresh-token"] = refreshToken;
  }

  return config;
};

export const requestInterceptorReject = (error: any) => {
  return Promise.reject(error);
};

export const responseInterceptorFulfill = async (response: AxiosResponse) => {
  return response;
};

export const responseInterceptorReject = async (error: any) => {
  if (error.response && error.response.status === 401) {
    // Token has expired
    await storage.removeItem("accessToken");
    // You might want to trigger a refresh token flow here
    // or redirect to login
  }
  return Promise.reject(error);
};
