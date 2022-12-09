// 导入数据库操作模块
const db = require('../db/index')

// 获取所有图书
exports.borrow = (req, res) => {
  const sql = 'select * from ev_books'
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    console.log(results);
    // if(results.length !== 1) return res.cc('获取失败！')
    res.send({
      code: 0,
      msg: '获取成功！',
      data: results
    })
  })
}

// 查询借阅信息
exports.search = (req, res) => {
  const query = req.query
  console.log(query);
  let sql = `select * from ev_books where bookName like '%${query.bookName}%'`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    console.log(results)
    res.send({
      code: 0,
      msg: '查询成功！',
      data: results
    })
  })
}

// 添加图书
exports.add = (req, res) => {
  const body = req.body
  const sql = 'insert into ev_books set ?'
  db.query(sql, body, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '添加成功！'
    })
  })
}

// 编辑图书
exports.edit = (req, res) => {
  const body = req.body
  console.log(body);
  const sql = 'update ev_books set ? where bookId = ?'
  db.query(sql, [body, body.bookId], (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '编辑成功！'
    })
  })
}

// 删除图书
exports.delete = (req, res) => {
  const body = req.body
  console.log(body);
  const sql = 'delete from ev_books where bookId = ?'
  db.query(sql, body.bookId, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '删除成功！'
    })
  })
}


