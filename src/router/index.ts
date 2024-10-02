import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Category from "@/views/Category.vue";
import SingleProduct from "@/views/products/[id].vue";
import { isUserLoggedIn } from "@/lib/utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: "/products/:id",
      name: "product",
      component: SingleProduct,
      meta: {
        auth: true
      }
    },
    {
      path: "/auth/login",
      name: "auth-login",
      component: Login
    },
    {
      path: "/auth/register",
      name: "auth-register",
      component: Register
    },
    {
      path: "/category",
      name: "category",
      component: Category,
      meta: {
        auth: true
      }
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await isUserLoggedIn();
  if (to.meta.auth && !isLoggedIn) {
    return next({ name: "auth-login" });
  }
  if (to.name === "auth-login" && isLoggedIn) {
    return next({ name: "home" });
  }
  next();
});

export default router;
