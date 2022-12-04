import api from "./api";


// 获取验证码
export const getCode = (params) =>
  api({
    url: "/captcha",
    method: "get",
    data: params,
  });
// 用户登录
export const loginSubmit = (params) =>
  api({
    url: "/login",
    method: "post",
    data: params,
  });
