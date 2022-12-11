const express = require("express");
const router = express.Router();
const log_handle = require("../router_handle/log.js");

// 获取系统日志
router.get("/log", log_handle.getLog);
// 修改系统日志
router.post("/log/edit", log_handle.editLog);
// 新增系统日志
router.post("/log/add", log_handle.addLog);

module.exports = router;
