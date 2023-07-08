import axios from "axios";
import Swal from "sweetalert2";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token"))
      config.headers = {
        Authorization: `Basic ${localStorage.getItem("token")}`,
      };
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    if (error?.response?.data) {
      console.log(error.response);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || error.response.data.error.message,
      });
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
);
