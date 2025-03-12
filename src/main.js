import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

//app creation
const app = createApp(App);

//store from pinia
app.use(createPinia());

//router for navBar
app.use(router);

//construct the application
app.mount("#app");
