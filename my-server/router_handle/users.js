// 导入数据库操作模块
const db = require("../db/index");

// 获取所有用户信息
exports.getUsers = (req, res) => {
  const sql = "select * from ev_users order by account DESC";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    console.log(results);
    // if(results.length !== 1) return res.cc('获取失败！')
    res.send({
      code: 0,
      msg: "获取成功！",
      data: results,
    });
  });
};

// 创建用户
exports.add = (req, res) => {
  const body = req.body;
  const sql = "insert into ev_users set ?";
  db.query(sql, body, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "添加成功！",
    });
  });
};

// 查询用户
exports.search = (req, res) => {
  const query = req.query;
  console.log(query);
  let sql = `select * from ev_users where userName like '%${query.userName}%'`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "查询成功！",
      data: results,
    });
  });
};

// 编辑用户
exports.edit = (req, res) => {
  const body = req.body;
  console.log(body);
  const sql = "update ev_users set ? where userId = ?";
  db.query(sql, [body, body.userId], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "编辑成功！",
    });
  });
};

// 删除用户
exports.delete = (req, res) => {
  const body = req.body;
  console.log(body);
  const sql = "delete from ev_users where userId = ?";
  db.query(sql, body.userId, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "删除成功！",
    });
  });
};
