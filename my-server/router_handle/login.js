// 导入数据库操作模块
const db = require("../db/index");
// 导入对密码进行加密的bcryptjs
const bcryptjs = require("bcryptjs");
// 导入生成token字符串的包
const jwt = require("jsonwebtoken");
// 导入生成随机验证码包
const svgCaptcha = require("svg-captcha");
// 导入数据库配置
const config = require("../config");
// 验证码随机值
let randomCode = "";

// 用户登录
exports.login = (req, res) => {
  const userInfo = req.body;
  const sql = "select * from users where account = ?";
  db.query(sql, userInfo.name, (err, results) => {
    if (err) return res.cc(err);
    if (randomCode !== userInfo.code) return res.cc("验证码输入错误！");
    if (results.length !== 1) return res.cc("登录失败！");
    // 判断密码是否一致
    const compareResult = bcryptjs.compareSync(
      userInfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc("登录失败，密码错误");
    const user = { ...results[0] };
    // 生成token
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    // 返回信息
    res.send({
      code: 0,
      msg: "登录成功！",
      data: results[0],
      token: "Bearer " + tokenStr,
    });
  });
};
// 获取验证码
exports.captcha = (req, res) => {
  const captcha = svgCaptcha.create({
    //字母和数字随机验证码
    height: 40, //高度
    size: 4, // 4个字母
    color: true, //文字颜色
    background: "#fff",
  });
  // 存session用于登录验证
  res.type("svg"); // 响应的类型
  res.status(200).send(captcha.data);
  // 生成的随机值
  randomCode = captcha.text.toLowerCase();
};
