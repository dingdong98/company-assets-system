const express = require("express");

const router = express.Router();
const classify_handle = require("../router_handle/classify");

// 获取图书分类
router.get("/classify", classify_handle.getClassify);
// 查询图书分类
router.get("/classify/search", classify_handle.search);
// 添加图书分类
router.post("/classify/add", classify_handle.addClassify);
// 编辑图书分类
router.post("/classify/edit", classify_handle.edit);
// 删除图书分类
router.post("/classify/delete", classify_handle.delete);

module.exports = router;
