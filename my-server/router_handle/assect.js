// 导入数据库操作模块
const db = require("../db/index");
const multer = require("multer");

// 获取所有资产
exports.borrow = (req, res) => {
  const sql = "select * from assects";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    console.log(results);
    res.send({
      code: 0,
      msg: "获取成功！",
      data: results,
    });
  });
};

// 查询借阅资产
exports.search = (req, res) => {
  const query = req.query;
  console.log(query);
  let sql = `select * from assects where assectName like '%${query.assectName}%'`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    console.log(results);
    res.send({
      code: 0,
      msg: "查询成功！",
      data: results,
    });
  });
};

// 添加资产
exports.add = (req, res) => {
  const body = req.body;
  const sql = "insert into assects set ?";
  db.query(sql, body, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "添加成功！",
    });
  });
};

// 编辑资产
exports.edit = (req, res) => {
  const body = req.body;
  console.log(body);
  const sql = "update assects set ? where assectId = ?";
  db.query(sql, [body, body.assectId], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "编辑成功！",
    });
  });
};

// 删除资产
exports.delete = (req, res) => {
  const body = req.body;
  console.log(body);
  const sql = "delete from assects where assectId = ?";
  db.query(sql, body.assectId, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "删除成功！",
    });
  });
};

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
let upload = multer({ storage: storage });

// 上传资产图片中间件-1
exports.multer = upload.single("file");
// 上传资产up图片中间件-2
exports.upload = (req, res) => {
  let file = req.file;
  console.log("文件名", file.filename);
  res.send(file);
};
