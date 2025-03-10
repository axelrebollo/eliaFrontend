import axios from "axios";

//Axios requests years
const apiYears = axios.create({
  baseURL: "http://localhost:18091/years",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  apiYears,
};