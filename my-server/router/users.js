const express = require('express')
const router = express.Router()
const users_handle = require('../router_handle/users')

// 获取所有用户
router.get('/users', users_handle.getUsers)
// 添加用户
router.post('/users/add', users_handle.add)
// 查询用户
router.get('/users/search', users_handle.search)
// 编辑用户
router.post('/users/edit', users_handle.edit)
// 删除用户
router.post('/users/delete', users_handle.delete)

module.exports = router