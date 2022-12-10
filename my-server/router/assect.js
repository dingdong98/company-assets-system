const express = require("express");
const router = express.Router();
const books_handle = require("../router_handle/assect");

// 获取所有图书
router.get("/assects", books_handle.borrow);
// 查询图书
router.get("/assects/search", books_handle.search);
// 添加图书
router.post("/assects/add", books_handle.add);
// 编辑图书
router.post("/assects/edit", books_handle.edit);
// 删除图书
router.post("/assects/delete", books_handle.delete);

module.exports = router;
