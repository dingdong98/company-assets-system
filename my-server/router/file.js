const express = require("express");
const router = express.Router();
const file_handle = require("../router_handle/file");

// 上传图片
router.post("/uploads", file_handle.photoHandle, file_handle.postFile);
// 获取图片
router.get("/uploads/photo/:filename", file_handle.getPhoto);
// 设置图片url地址
router.post('/uploads/setphoto', file_handle.setPhotoPath)

module.exports = router;
