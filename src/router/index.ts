import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

declare module "vue-router" {
  interface RouteMeta {
    pageTitle: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
