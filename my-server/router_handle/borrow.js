// 导入数据库操作模块
const db = require('../db/index')

// 获取借阅信息(所有)
exports.borrow = (req, res) => {
  const sql = 'select * from ev_borrow order by borrowTime DESC'
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    console.log(results);
    // if(results.length !== 1) return res.cc('获取失败！')
    res.send({
      code: 0,
      msg: '获取借阅信息成功！',
      data: results
    })
  })
}

// 查询借阅信息
exports.search = (req, res) => {
  const query = req.query
  console.log(query);
  let sql = ''
  let queryArr = []
  if(query.status === '0') {
    sql =  `select * from ev_borrow where account like '%${query.account}%'`
    queryArr = [query.account]
  }else {
    sql = `select * from ev_borrow where account like '%${query.account}%' and borrowStatus like '%${query.status}%'`
    queryArr = [query.account, parseInt(query.status)]
  }
  db.query(sql, queryArr, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '查询成功！',
      data: results
    })
  })
}

// 添加待还借阅
exports.add = (req, res) => {
  const body = req.body
  const sql = 'insert into ev_borrow set ?'
  db.query(sql, body, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '添加成功！'
    })
  })
}

// 还书
exports.returnBook = (req, res) => {
  const body = req.body
  console.log(body);
  const sql = "update ev_borrow set borrowStatus = 0, returnTime = ? where id = ?"
  db.query(sql, [body.returnTime, parseInt(body.id)], (err, results) => {
    if(err) return res.cc(err)
    res.send({
      code: 0,
      msg: '还书成功！'
    })
  })
}