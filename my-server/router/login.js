const express = require("express");
const router = express.Router();
const login_handle = require("../router_handle/login");

// 获取验证码
router.get("/captcha", login_handle.captcha);
// 用户登录路由
router.post("/login", login_handle.login);

module.exports = router;
