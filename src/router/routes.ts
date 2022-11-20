import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/HomeView.vue"),
    meta: {
      pageTitle: "Главная",
    },
  },
];
