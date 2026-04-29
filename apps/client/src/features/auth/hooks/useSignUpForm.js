import { signupService } from "../services";
import { signupFormConfig } from "../utils/authFormConfigs";
import useAuthForm from "./useAuthForm";

export default function useLoginForm() {
  return useAuthForm({
    ...signupFormConfig,
    service: signupService,
  });
}
