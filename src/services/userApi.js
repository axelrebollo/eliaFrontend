import axios from "axios";

//Axios requests users
const apiClient = axios.create({
  baseURL: "http://localhost:18090/users",  //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios request profiles
const apiProfile = axios.create({
  baseURL: "http://localhost:18090/profiles", //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  apiClient,
  apiProfile,
};