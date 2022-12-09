const express = require("express");
const router = express.Router();
const books_handle = require("../router_handle/books");

// 获取所有图书
router.get("/books", books_handle.borrow);
// 查询图书
router.get("/books/search", books_handle.search);
// 添加图书
router.post("/books/add", books_handle.add);
// 编辑图书
router.post("/books/edit", books_handle.edit);
// 删除图书
router.post("/books/delete", books_handle.delete);

module.exports = router;
