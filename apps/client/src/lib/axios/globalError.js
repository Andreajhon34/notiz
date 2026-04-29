import { toast } from "sonner";
import axios from "axios";

export default function globalError(error) {
  if (axios.isCancel(error)) return Promise.reject(error);
  if (!axios.isAxiosError(error)) {
    console.error("Unexpected error:", error);
    return Promise.reject(error);
  }

  const { response, code } = error;

  if (code === "ERR_NETWORK") {
    toast.error("No internet connection.");
    return Promise.reject(error);
  }

  if (code === "ECONNABORTED") {
    toast.error("Timeout.");
    return Promise.reject(error);
  }

  if (response) {
    const status = response.status;

    switch (status) {
      case 401:
        break;

      case 403:
        toast.error("Unauthorized access.");
        break;

      case 404:
        toast.error("Resource not found.");
        break;

      case 429:
        toast.error("Too many requests.");
        break;

      case 500:
      case 502:
      case 503:
        toast.error("Internal server error.");
        break;

      default:
    }
  }

  return Promise.reject(error);
}
