import Vue from "vue";
import vueRouter from "vue-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Index from "../pages/Index";
import Assets from "../pages/Assets";
import Classification from "../pages/Classification";
import Borrowing from "../pages/Borrowing";
import Users from "../pages/Users";
import Role from "../pages/Role";
import Log from "../pages/Log";
import Suggest from "../pages/Suggest.vue";
import store from "@/utils/store";

Vue.use(vueRouter);
const router = new vueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      children: [
        { name: "index", path: "index", component: Index },
        { name: "assets", path: "assets", component: Assets },
        {
          name: "classification",
          path: "classification",
          component: Classification,
        },
        { name: "borrowing", path: "borrowing", component: Borrowing },
        { name: "users", path: "users", component: Users },
        { name: "role", path: "role", component: Role },
        { name: "log", path: "log", component: Log },
        { name: "suggest", path: "suggest", component: Suggest },
      ],
    },
  ],
});

// 前端权限控制
const whileList = ["/home/index", "/home/assets", "/home/classification"];
router.beforeEach((to, from, next) => {
  const token = store.getters.token;
  // 登录成功，返回token
  if (token) {
    if (to.path === "/login") {
      next("/");
    } else if (to.path === "/") {
      next();
    } else {
      // 普通用户
      if (store.getters.role == "1") {
        if (whileList.includes(to.path)) {
          next();
        } else {
          next(from.path);
        }
      } else {
        next();
      }
    }
  } else {
    // 首次登录
    if (to.path === "/login") {
      next();
    } else {
      next();
    }
  }
});
export default router;
