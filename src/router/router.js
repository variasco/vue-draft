import Main from "@/pages/Main";
import PostsPage from "@/pages/PostsPage";
import AboutPage from "@/pages/AboutPage";
import PostDetailsPage from "@/pages/PostDetailsPage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostsPage,
  },
  {
    path: "/post/:id",
    component: PostDetailsPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
