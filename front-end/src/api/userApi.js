import { axiosInstance } from "./config.js";
import jwt_decode from "jwt-decode";

export async function getUserInfo() {
  try {
    let { userId } = jwt_decode(localStorage.getItem("token"));
    const check = await axiosInstance.get(`/users/${userId}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}
