import { api } from "./axios";
export interface CustomError {
  response?: {
    data: { message: string };
  };
  message?: string;
}

export const signUp = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  plan: string;
}) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const logIn = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const verifyEmail = async ({
  token,
}: {
  token: string;
  password: string;
}) => {
  const response = await api.post("/auth/verify-email", { token });
  return response.data;
};

export const resendEmailToken = async (email: string) => {
  const response = await api.post("/auth/resend-verification-email", { email });
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await api.post("/auth/request-reset-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};
