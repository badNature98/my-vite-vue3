var fs = require("fs");
var path = require("path");
let API = {};
//要遍历的文件夹所在的路径

(async () => {
  const filePath = path.resolve(__dirname);
  const list = await getDIR(filePath,false)
  list.splice(list.indexOf('index.js'),1)
  filesForEach(list,filePath)
  //获取一个文件下的 所有 dir 和 文件
  function getDIR(filePath, play = true) {
    return new Promise(function (reslove, reject) {
      fs.readdir(filePath, function (err, files) {
        if (err) {
          console.warn(err, "读取文件夹错误！");
          reject(err);
        } else {
          //遍历读取到的文件列表
          reslove(files);
          if (play) filesForEach(files,filePath);
        }
      });
    });
  }
  //循环文件 判断 是 路径 还是 文件
  function filesForEach(files,filePath) {
    files.forEach(function (filename) {
      //获取当前文件的绝对路径
      var filedir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      fs.stat(filedir, function (eror, stats) {
        if (eror) {
          console.warn("获取文件stats失败");
        } else {
          var isFile = stats.isFile(); //是文件
          var isDir = stats.isDirectory(); //是文件夹
          if (isFile) {
            let api = require(filedir)
            API[filedir] = api;
          }
          if (isDir) {
            getDIR(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
          }
        }
      });
    });
  }
})();

module.exports = API;
