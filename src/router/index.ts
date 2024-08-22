import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/Layout/DefaultLayout.vue";

const router = createRouter({
  sensitive: true,
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      meta: { layout: DefaultLayout },
      component: () => import("../views/Landing/LandingView.vue"),
    },
  ],
});

export default router;
