const fs = require("fs");
const db = require("../db/index");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const fileFormat = file.originalname.split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  },
});

const photoUpload = multer({
  storage: storage,
});
exports.photoHandle = photoUpload.single("file");

// 上传图片
exports.postFile = (req, res) => {
  const { filename, mimetype, size } = req.file;
  console.log(filename, mimetype, size);
  const sql = `insert into photo (filename,mimetype,size) value (?,?,?)`;
  db.query(sql, [filename, mimetype, size], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "上传图片成功",
      data: req.file,
    });
  });
};
// 获取图片
exports.getPhoto = (req, res) => {
  const filename = req.params.filename;
  console.log(req.params);
  const sql = `select * from photo where filename = ?`;
  db.query(sql, filename, (err, results) => {
    if (err) return res.cc(err);
    console.log(results);
    fs.readFile(`public/images/${filename}`, (err, data) => {
      res.set({ "Content-Type": results[0].mimetype });
      res.end(data);
    });
  });
};
//获取图片filename并且设置url路径
exports.setPhotoPath = (req, res) => {
  console.log(req);
  const assectName = req.body.assectName;
  const phtotPath = `http://127.0.0.1:3007/api/uploads/photo/${req.body.filename}`;
  const sql = `update assects set photo = ? where assectName = ? `;
  db.query(sql, [phtotPath, assectName], (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      msg: "设置成功",
      data: results,
    });
  });
};
