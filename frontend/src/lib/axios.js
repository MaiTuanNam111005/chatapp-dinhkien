import axios from "axios";

//==========================================

//Local
// const BASE_URL = "http://localhost:5001/api";

//production
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});