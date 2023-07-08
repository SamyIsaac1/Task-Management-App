import { axiosInstance } from "./config.js";

export async function register(data) {
  try {
    const check = await axiosInstance.post("/auth/register", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}

export async function login(data) {
  try {
    const check = await axiosInstance.post("/auth/login", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}
