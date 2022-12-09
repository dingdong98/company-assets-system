const express = require("express");
const router = express.Router();
const suggest_handle = require("../router_handle/suggest");

// 获取留言
router.get("/suggest", suggest_handle.getSuggest);
// 查询留言
router.get("/suggest/search", suggest_handle.searchSuggest);
// 新增留言
router.post("/suggest/add", suggest_handle.add);
// 删除留言
router.post('/suggest/delete', suggest_handle.delete)
// 编辑留言
router.post('/suggest/edit', suggest_handle.edit)

module.exports = router;
