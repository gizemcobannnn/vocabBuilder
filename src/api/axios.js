import axios from "axios";

const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
