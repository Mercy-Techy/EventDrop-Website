import axios from "axios";
export interface CustomError {
  response?: {
    data: { message: string };
  };
  message?: string;
}

const base_url = import.meta.env.VITE_BASE_URL;

export const signUp = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  plan: string;
}) => {
  const response = await axios.post(`${base_url}/auth/signup`, data);
  return response.data;
};

export const logIn = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${base_url}/auth/login`, data);
  return response.data;
};
