import axios from "axios";

//Axios requests years
const apiYears = axios.create({
  baseURL: "http://localhost:18091/years",
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests subjects
const apiSubjects = axios.create({
  baseURL: "http://localhost:18091/subjects",
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests courses
const apiCourses = axios.create({
  baseURL: "http://localhost:18091/courses",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  apiYears,
  apiSubjects,
  apiCourses,
};