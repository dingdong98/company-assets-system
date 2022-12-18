const db = require("../db/index");

// 获取系统日志
exports.getLog = (req, res) => {
  const sql = `select * from log `;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "获取系统日志成功",
      data: results,
    });
  });
};
// 编辑系统日志
exports.editLog = (req, res) => {
  const { info, id } = req.body;
  const sql = `update log set info = ? where id = ?`;
  db.query(sql, [info, id], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "编辑系统日志成功",
      data: results,
    });
  });
};
// 新增系统日志
exports.addLog = (req, res) => {
  const { info } = req.body
  const sql = `insert into log set info = ?`
  db.query(sql, info, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      code: 0,
      msg: '新增系统日志成功',
      data: results
    })
  })
}
