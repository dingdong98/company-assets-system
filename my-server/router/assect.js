const express = require("express");
const router = express.Router();
const books_handle = require("../router_handle/assect");

// 获取所有资产
router.get("/assects", books_handle.borrow);
// 查询资产
router.get("/assects/search", books_handle.search);
// 添加资产
router.post("/assects/add", books_handle.add);
// 编辑资产
router.post("/assects/edit", books_handle.edit);
// 删除资产
router.post("/assects/delete", books_handle.delete);
// 上传资产图片
router.post("/assects/upload", books_handle.multer, books_handle.upload);
// 获取所有图片

module.exports = router;
