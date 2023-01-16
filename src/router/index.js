import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Home from "../components/NavbarView.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem("sessionId")) {
    //     next();
    //   } else {
    //     next({ path: "https://100014.pythonanywhere.com/" });
    //   }
    // },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
