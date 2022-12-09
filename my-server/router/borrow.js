const express = require("express");
const router = express.Router();
const borrow_handle = require("../router_handle/borrow");

// 获取借阅图书内容
router.get("/borrow", borrow_handle.borrow);
// 查询借阅内容
router.get("/borrow/search", borrow_handle.search);
// 添加待还借阅记录
router.post("/borrow/add", borrow_handle.add);
// 还书
router.post("/borrow/returnBook", borrow_handle.returnBook);

module.exports = router;
