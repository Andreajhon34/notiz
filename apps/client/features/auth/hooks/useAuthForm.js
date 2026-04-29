import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../src/lib/useAuthStore";
import { useShallow } from "zustand/shallow";
import axios from "axios";

export default function useAuthForm({
  defaultValues,
  formInputConfig,
  service,
  redirectTo = "/home",
}) {
  const { setUser, setToken } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setToken: state.setToken,
    })),
  );

  const form = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const {
        data: { accessToken, ...props },
      } = await service(data);

      setUser(props);
      setToken(accessToken);
      navigate(redirectTo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { code, message } = error.response?.data || {};

        const errorMap = {
          USER_ALREADY_EXISTS: message,
          INVALID_CREDENTIALS: message,
          EMAIL_NOT_VERIFIED: message,
        };

        form.setError("root.serverError", {
          type: "server",
          message: errorMap[code] ?? "Unexpected error occured",
        });
      }
    }
  });

  return {
    isSubmitting: form.formState.isSubmitting,
    serverError: form.formState.errors.root?.serverError,
    isValid: form.formState.isValid,
    control: form.control,
    handleSubmit,
    formInputConfig,
  };
}
