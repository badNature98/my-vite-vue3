var fs = require("fs");
var path = require("path");
let File = require("../../utils/File");
let { server } = require(path.join(__dirname, "../../server/index.js"));
const { deepCopy } = require(path.join(__dirname, "../../function/index.js"));

server.get("/files/download", async (req, res) => {
  const { dir } = req.query;
  if (dir) {
    let reD = await File.read(dir);
    res.send(reD);
  } else {
    res.send("参数不全！缺少 dir");
  }
});

server.get("/files/getFile", async (req, res) => {
  let timeOut = setTimeout(() => {
    res.send("超时");
  }, 1000);
  //获取文件
  let list = await File.get({
    dir: path.resolve(__dirname, "../../../"),
    test: null, //正则表达  /\.svg$/
    deep: true, //是否深查询
    flat: false, //是否平摊数组
  });
  clearTimeout(timeOut);
  // res.send(JSON.stringify(list));
  let config = { req: deepCopy(req), res: deepCopy(res) };
  res.send(JSON.stringify({ data: list, config }));
});

module.exports = { server };
