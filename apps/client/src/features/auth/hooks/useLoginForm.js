import { loginService } from "../services";
import { loginFormConfig } from "../utils/authFormConfigs";
import useAuthForm from "./useAuthForm";

export default function useLoginForm() {
  return useAuthForm({
    ...loginFormConfig,
    service: loginService,
  });
}
