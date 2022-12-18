// 导入数据库操作模块
const db = require("../db/index");

// 获取借阅信息(所有)
exports.borrow = (req, res) => {
  const sql = "select * from borrow order by borrowTime DESC";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "获取租借消息成功！",
      data: results,
    });
  });
};

// 查询借阅信息
exports.search = (req, res) => {
  const query = req.query;
  console.log(query);
  let sql = "";
  let queryArr = [];
  if (query.status === "0") {
    // 已归还：查询租借人
    sql = `select * from borrow where account like '%${query.account}%'`;
    queryArr = [query.account];
  } else {
    // 未归还：查询租借人和归还状态
    sql = `select * from borrow where account like '%${query.account}%' and borrowStatus like '%${query.status}%'`;
    queryArr = [query.account, parseInt(query.status)];
  }
  db.query(sql, queryArr, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "查询成功",
      data: results,
    });
  });
};

// 添加待还借阅
exports.add = (req, res) => {
  const body = req.body;
  const sql =
    "insert into borrow (account,borrowTime,planReturnTime,assectName) values (?,?,?,?)";
  db.query(
    sql,
    [body.account, body.borrowTime, body.planReturnTime, body.assectName[1]],
    (err, results) => {
      if (err) return res.cc(err);
      res.send({
        code: 0,
        msg: "添加成功！",
      });
    }
  );
};

// 归还借阅
exports.return = (req, res) => {
  const body = req.body;
  const sql = "update borrow set borrowStatus = 0, returnTime = ? where id = ?";
  db.query(sql, [body.returnTime, parseInt(body.id)], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "操作成功！",
    });
  });
};

// 超时列表
exports.getLateList = (req, res) => {
  const sql = `select * from borrow where borrowStatus = 1`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "获取超时列表成功",
      data: results,
    });
  });
};

// 处理超时列表
exports.getOverLateList = (req, res) => {
  const arr = req.body;
  const sql = `update borrow set borrowStatus = 2 where id = ?`;
  for (let i = 0; i < arr.length; i++) {
    db.query(sql, arr[i], (err, results) => {});
  }
  return res.send({
    code: 0,
    msg: "成功",
  });
};

//申请租借
exports.apply = (req, res) => {
  const { account, assectName, borrowTime, planReturnTime } = req.body;
  const sql = `insert into borrow (account,assectName,borrowTime,planReturnTime,borrowStatus) value(?,?,?,?,3)`;
  db.query(
    sql,
    [account, assectName[1], borrowTime, planReturnTime],
    (err, results) => {
      if (err) return res.cc(err);
      res.send({
        code: 0,
        msg: "申请成功",
        data: results,
      });
    }
  );
};

// 同意租借
exports.agree = (req, res) => {
  const { id } = req.body;
  const sql = `update borrow set borrowStatus = 1 where id = ?`;
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "操作成功",
      data: results,
    });
  });
};
