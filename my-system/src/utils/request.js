import api from "./api";

// TODO:登录页面API
// 获取验证码
export const getCode = (params) => {
  return api({
    url: "/captcha",
    method: "get",
    data: params,
  });
};
// 用户登录
export const loginSubmit = (params) => {
  return api({
    url: "/login",
    method: "post",
    data: params,
  });
};

// TODO: 资产管理API
// 获取资产列表
export const getAssetsList = (params) => {
  return api({
    url: "/books",
    method: "get",
    data: params,
  });
};
// 获取资产分类列表
export const getAssetsClassify = (params) => {
  return api({
    url: "/classify",
    method: "get",
    data: params,
  });
};
// 添加资产
export const createAssets = (params) => {
  return api({
    url: "/books/add",
    method: "post",
    data: params,
  });
};
// 删除资产
export const deleteAssets = (params) => {
  return api({
    url: "/books/delete",
    method: "post",
    data: params,
  });
};
// 修改资产
export const editAssets = (params) => {
  return api({
    url: "/books/edit",
    method: "post",
    data: params,
  });
};
// 查询资产
export const searchAssets = (params) => {
  return api({
    url: `/books/search?bookName=${params}`,
    method: "get",
    data: params,
  });
};

// TODO: 资产分类API
// 添加分类
export const createClassify = (params) => {
  return api({
    url: `/classify/add`,
    method: "post",
    data: params,
  });
};
// 删除分类
export const deleteClassify = (params) => {
  return api({
    url: `/classify/delete`,
    method: "post",
    data: params,
  });
};
// 修改分类
export const editClassify = (params) => {
  return api({
    url: `/classify/edit`,
    method: "post",
    data: params,
  });
};
// 查询分类
export const searchClassify = (params) => {
  return api({
    url: `/classify/search?className=${params}`,
    method: "get",
    data: params,
  });
};

// TODO: 审批管理API
// 获取借用列表
export const getBorrowList = (params) => {
  return api({
    url: `/borrow`,
    method: "get",
    data: params,
  });
};
// 添加待借用记录
export const createBorrow = (params) => {
  return api({
    url: `/borrow/add`,
    method: "post",
    data: params,
  });
};
// 查询借阅内容
export const searchBorrow = ({ account, status }) => {
  return api({
    url: `/borrow/search?account=${account}&status=${status}`,
    method: "get",
    data: { account, status },
  });
};
// 归还借用
export const returnBorrow = (params) => {
  return api({
    url: `/borrow/returnBook`,
    method: "post",
    data: params,
  });
};

// TODO: 用户管理API
// 获取所有用户
export const getUserList = (params) => {
  return api({
    url: `/users`,
    method: "get",
    data: params,
  });
};
// 添加用户
export const createUser = (params) => {
  return api({
    url: `/users/add`,
    method: "post",
    data: params,
  });
};
// 查询用户
export const searchUser = (params) => {
  return api({
    url: `/users/search?userName=${params}`,
    method: "get",
    data: params,
  });
};
// 编辑用户
export const editUser = (params) => {
  return api({
    url: `/users/edit`,
    method: "post",
    data: params,
  });
};
// 删除用户
export const deleteUser = (params) => {
  return api({
    url: `/users/delete?userId=${params}`,
    method: "post",
    data: params,
  });
};

// TODO: 留言建议API
// 获取所有留言建议
export const getSuggest = (params) => {
  return api({
    url: `/suggest`,
    method: "get",
    data: params,
  });
};
// 查询留言
export const searchSuggest = (params) => {
  return api({
    url: `/suggest/search?suggestContent=${params}`,
    method: "get",
    data: params,
  });
};
// 创建留言
export const createSuggest = (params) => {
  return api({
    url: `/suggest/add`,
    method: "post",
    data: params,
  });
};
// 删除留言
export const deleteSuggest = (params) => {
  return api({
    url: `/suggest/delete`,
    method: "post",
    data: params,
  });
};
// 删除留言
export const editSuggest = (params) => {
  return api({
    url: `/suggest/edit`,
    method: "post",
    data: params,
  });
};
