import { axiosInstance } from "./config.js";

export async function getAllTasks() {
  try {
    const check = await axiosInstance.get("/tasks");
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}

export async function getTaskById(id) {
  try {
    const check = await axiosInstance.get(`/tasks/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}

export async function addNewTask(data) {
  try {
    const check = await axiosInstance.post("/tasks", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}

export async function deleteTaskById(id) {
  try {
    const check = await axiosInstance.delete(`/tasks/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}

export async function updaeTaskById(taskId,data) {
  try {
    const check = await axiosInstance.patch(`/tasks/${taskId}`,data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}
