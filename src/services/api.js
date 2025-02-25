import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:18090/users",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiProfile = axios.create({
  baseURL: "http://localhost:18090/profiles",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  apiClient,
  apiProfile,
};