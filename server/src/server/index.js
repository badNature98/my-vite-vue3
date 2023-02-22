//此文件加 引入 express
const express = require("express");
// const session = require("express-session");
const server = express();

const port = 2581; //端口号

// 设置session中间件
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false, //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
//     saveUninitialized: true,
//     cookie: {
//       // secure: true,
//       maxAge: 2 * 60 * 60 * 1000 /*过期时间*/,
//     },
//     rolling: true, //在每次请求时重新设置 cookie，用于重置 cookie 过期时间（默认：false）
//   })
// );

/*为server添加中间件处理跨域请求*/
server.use(function (req, res, next) {
  const arr = req.url.split('/');//请求 path 
  // if(req.session.user){
  //   //用户登录
  // }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "token");
  next();
});

// 监听 @port 端口
server.listen(port, () => {
  console.log(`启动服务成功！\n\rlocalhost:${port}`);
});

module.exports = { server };
