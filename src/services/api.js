import axios from "axios";

//Axios requests users
const apiClient = axios.create({
  baseURL: "http://localhost:18090/users",
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios request profiles
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