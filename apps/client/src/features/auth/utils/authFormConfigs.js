export const loginFormConfig = {
  defaultValues: {
    email: "",
    password: "",
  },
  formInputConfig: [
    {
      name: "email",
      label: "Email",
      rules: {
        required: "Email wajib diisi",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Format email tidak valid",
        },
      },
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      rules: {
        required: "Password wajib diisi",
        minLength: {
          value: 6,
          message: "Minimal 6 karakter",
        },
      },
      type: "password",
    },
  ],
};

export const signupFormConfig = {
  defaultValues: {
    username: "",
    email: "",
    password: "",
  },
  formInputConfig: [
    {
      name: "username",
      label: "Username",
      rules: {
        required: "Username wajib diisi",
        minLength: {
          value: 3,
          message: "Minimal 3 karakter",
        },
      },
      type: "text",
    },
    ...loginFormConfig.formInputConfig, // reuse login fields
  ],
};
