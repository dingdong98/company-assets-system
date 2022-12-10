const db = require("../db/index");

// 获取所有留言信息
exports.getSuggest = (req, res) => {
  const sql = "select * from suggest order by id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "获取成功！",
      data: results,
    });
  });
};
// 查询留言
exports.searchSuggest = (req, res) => {
  const query = req.query;
  const sql = `select * from suggest where content like '%${query.suggestContent}%'`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "查询成功！",
      data: results,
    });
  });
};
// 新增留言
exports.add = (req, res) => {
  const body = req.body;
  const sql = `insert into suggest set ?`;
  db.query(sql, body, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "添加成功！",
    });
  });
};
// 删除留言
exports.delete = (req, res) => {
  const body = req.body;
  const sql = `delete from suggest where id = ?`;
  db.query(sql, body.id, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "删除成功！",
    });
  });
};
// 编辑留言
exports.edit = (req, res) => {
  const body = req.body;
  const sql = "update suggest set ? where id = ?";
  db.query(sql, [body, body.id], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "编辑成功",
    });
  });
};
