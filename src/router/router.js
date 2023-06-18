import AboutPage from "@/pages/AboutPage";
import Main from "@/pages/Main";
import PostDetailsPage from "@/pages/PostDetailsPage";
import PostsPage from "@/pages/PostsPage";
import PostsPageComposition from "@/pages/PostsPageComposition";
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
    path: "/composition",
    component: PostsPageComposition,
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
