import axios from "axios";

const API = axios.create({ baseURL: "https://mini-linkedin-backend-5ty8.onrender.com" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
