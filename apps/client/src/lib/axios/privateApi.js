import axios from "axios";
import { createAuthRefresh } from "axios-auth-refresh";
import { useAuthStore } from "../useAuthStore";
import globalError from "./globalError";
import authApi from "./authApi";

const privateApi = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10_000,
});

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const refreshAuthLogic = async (failedRequest) => {
  try {
    const res = await authApi.post("/refresh");

    const { accessToken } = res.data.data;

    useAuthStore.getState().setToken(accessToken);

    failedRequest.response.config.headers["Authorization"] = accessToken;

    return Promise.resolve();
  } catch (err) {
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setUser(null);

    return Promise.reject(err);
  }
};

createAuthRefresh(privateApi, refreshAuthLogic);
privateApi.interceptors.response.use(
  (response) => response,
  (error) => globalError(error),
);

export default privateApi;
