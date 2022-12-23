import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/words",
  },
  {
    path: "/words",
    name: "words",
    component: () => import("../pages/Words/PageWords.vue"),
    meta: {
      pageTitle: "Words",
    },
  },
];
