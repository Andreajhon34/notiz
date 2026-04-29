import axios from "axios";
import globalError from "./globalError";

const authApi = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 5000,
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => globalError(error),
);

export default authApi;
