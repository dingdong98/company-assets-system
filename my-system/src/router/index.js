import Vue from "vue";
import vueRouter from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import Index from "../views/Index";
import Assets from "../views/Assets";
import Classification from "../views/Classification";
import Borrowing from "../views/Borrowing";
import Users from "../views/Users";
import Role from "../views/Role";
import Log from "../views/Log";
import Suggest from "../views/Suggest.vue";
import Personal from "../views/Personal.vue";
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
        { name: "Personal", path: "personal", component: Personal },
      ],
    },
  ],
});

// 前端权限控制
const whileList = [
  "/home/index",
  "/home/assets",
  "/home/classification",
  "/home/log",
  "/home/suggest",
  "/home/personal",
];
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
