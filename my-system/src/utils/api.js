import axios from "axios";
import { Message } from "element-ui";
import router from "../router";

// 设置Json格式
axios.defaults.headers["Content-Type"] = "application/json";

const api = axios.create({
  baseURL: "http://127.0.0.1:3007/api",
  timeout: 3000,
});

// 请求拦截器
api.interceptors.request.use(
  (req) => {
    // 请求携带token
    const token = sessionStorage.getItem("token");
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => {
    router.push("/login");
    router.Promise.reject(err);
  }
);
// 响应拦截器
api.interceptors.response.use(
  (success) => {
    // 业务逻辑错误
    if (success.status && success.status == 200) {
      if (
        success.data.code == 500 ||
        success.data.code == 401 ||
        success.data.code == 403
      ) {
        Message.error({ message: success.data.message });
        return;
      }
      if (success.data.message) {
        Message.success({ message: success.data.message });
      }
    }
    return success.data;
  },
  (error) => {
    if (error.response.code == 504 || error.response.code == 404) {
      Message.error({ message: "请求错误" });
    } else if (error.response.code == 403) {
      Message.error({ message: "权限不足，请联系管理员！" });
    } else if (error.response.code == 401) {
      Message.error({ message: "尚未登录，请登录！" });
      router.replace("/");
    } else {
      if (error.replace.data.message) {
        Message.error({ message: error.replace.data.message });
      } else {
        Message.error("未知错误！");
      }
    }
    return;
  }
);

export default api;

/* 基地址
const baseUrl = "http://127.0.0.1:3007/api";

传送json格式的post请求
export const postRequest = (url, params) => {
  return axios({
    url: `${baseUrl}${url}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: qs.stringify(params),
  });
};
传送json格式的get请求
export const getRequest = (url, params) => {
  return axios({
    url: `${baseUrl}${url}`,
    method: "get",
    params: params,
  });
}; */
