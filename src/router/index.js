import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import ProfileView from "@/views/ProfileView.vue";
import NotebookView from "@/views/NotebookView.vue";
import ProfileStudent from "@/components/ProfileStudent.vue";
import ProfileTeacher from "@/components/ProfileTeacher.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
        },
        {
          path: "register",
          name: "register",
          component: Register,
        },
      ],
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      children: [
        {
          path: "profileStudent",
          name: "profileStudent",
          component: ProfileStudent,
        },
        {
          path: "profileTeacher",
          name: "profileTeacher",
          component: ProfileTeacher,
        },
      ],
    },    
    {
      path: "/notebook",
      name: "notebook",
      component: NotebookView,
    },
  ],
});

export default router;
