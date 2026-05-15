import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const workspaceId = localStorage.getItem("workspace")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if(workspaceId){
    config.headers["x-workspace-id"] = workspaceId
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("workspace")
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
