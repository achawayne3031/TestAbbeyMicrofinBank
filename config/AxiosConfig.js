import axios from "axios";
// import { getToken } from "../utils/LocalStorage";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can modify the request config here
//     // For example, add an authorization token

//     const token = getToken();
//     if (token !== null) {
//       config.headers.Authorization = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
