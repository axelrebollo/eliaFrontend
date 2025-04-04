import axios from "axios";

//Axios requests years
const apiYears = axios.create({
  baseURL: "http://localhost:18091/years",    //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests subjects
const apiSubjects = axios.create({
  baseURL: "http://localhost:18091/subjects",   //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests courses
const apiCourses = axios.create({
  baseURL: "http://localhost:18091/courses",    //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests groups
const apiGroups = axios.create({
  baseURL: "http://localhost:18091/groups",   //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests tables
const apiTables = axios.create({
  baseURL: "http://localhost:18091/tables",   //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests classroomsProfile
const apiClassroomProfile = axios.create({
  baseURL: "http://localhost:18091/classroomProfile",   //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

//Axios requests classroomsProfile
const apiCells = axios.create({
  baseURL: "http://localhost:18091/cells",    //to change for url to backend in production
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  apiYears,
  apiSubjects,
  apiCourses,
  apiGroups,
  apiTables,
  apiClassroomProfile,
  apiCells,
};