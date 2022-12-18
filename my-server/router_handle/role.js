const db = require("../db/index");

// 获取所有角色信息
exports.getRole = (req, res) => {
  const sql = "select * from role order by roleId ASC";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "获取成功！",
      data: results,
    });
  });
};
// 查询角色
exports.search = (req, res) => {
  const query = req.query;
  const sql = `select * from role where rolename like '%${query.rolename}%'`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "查询成功！",
      data: results,
    });
  });
};
// 新增角色
exports.add = (req, res) => {
  const body = req.body;
  const sql = `insert into role set ?`;
  db.query(sql, body, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "添加成功！",
    });
  });
};
// 删除角色
exports.delete = (req, res) => {
  const body = req.body;
  const sql = `delete from role where roleId = ?`;
  db.query(sql, body.roleId, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "删除成功！",
    });
  });
};
// 编辑角色
exports.edit = (req, res) => {
  const body = req.body;
  const sql = "update role set ? where roleId = ?";
  db.query(sql, [body, body.id], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "编辑成功",
    });
  });
};
