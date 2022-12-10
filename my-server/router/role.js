const express = require("express");
const router = express.Router();
const role_handle = require("../router_handle/role");

// 获取角色
router.get("/role", role_handle.getRole);
// 查询角色
router.get("/role/search", role_handle.search);
// 新增角色
router.post("/role/add", role_handle.add);
// 删除角色
router.post("/role/delete", role_handle.delete);
// 编辑角色
router.post("/role/edit", role_handle.edit);

module.exports = router;
