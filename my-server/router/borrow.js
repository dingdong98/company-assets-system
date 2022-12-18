const express = require("express");
const router = express.Router();
const borrow_handle = require("../router_handle/borrow");

// 获取借阅图书内容
router.get("/borrow", borrow_handle.borrow);
// 查询借阅内容
router.get("/borrow/search", borrow_handle.search);
// 添加待还借阅记录
router.post("/borrow/add", borrow_handle.add);
// 归还借阅
router.post("/borrow/return", borrow_handle.return);
// 查询未按时归还资产
router.get("/borrow/late", borrow_handle.getLateList);
// 处理超时未归还资产
router.post("/borrow/late/return", borrow_handle.getOverLateList);
// 申请租借资产
router.post("/borrow/apply", borrow_handle.apply);
// 同意租借资产
router.post("/borrow/agree", borrow_handle.agree);

module.exports = router;
