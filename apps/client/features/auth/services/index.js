import authApi from "../../../src/lib/axios/authApi";

export const loginService = async (data) => {
  const res = await authApi.post("/login", data);
  return res.data;
};

export const signupService = async (data) => {
  const res = await authApi.post("/signup", data);
  return res.data;
};
