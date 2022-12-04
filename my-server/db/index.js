// 导入 mysql 模块
const mysql  =require('mysql')
// 创建数据库连接对象并导出
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'dingdong888!',
    database: 'library_management_system'
})
module.exports = db