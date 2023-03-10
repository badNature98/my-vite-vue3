const fs = require("fs");
const path = require("path");
const stream = require("stream");
const eol = require("eol");
// stream.setEncoding('utf8');
module.exports = {
  getFile(path){
    return new Promise(function(reslove,reject){
      fs.readFile(path,'utf-8',function(err,data){
        if(err){
          reject("error")
        }else{
          reslove(data)
        }
      })
    })
  },
  //文件太大会报错
  read: async function (dir) {
    return new Promise(function (reslove, reject) {
      let base = "";
      const readStream = fs.createReadStream(dir);
      readStream.setEncoding("utf8");
      readStream.on("data", function (chunk) {
        base += eol.auto(chunk.toString("utf8"));
      });
      readStream.on("end", function () {
        reslove(base);
      });
      readStream.on("error", function () {
        reject("获取失败！");
      });
    });
  },
  get: async function (parm) {
    const {
      dir, //查找的路径
      test = null, //文件正则表达  /\.svg$/
      deep = false, //是否深入
      flat = false, //是否平摊数组
    } = parm;
    const reData = await getDir(path.join(dir));
    return reData;
    async function getDir(dir) {
      return new Promise(function (relove, reject) {
        fs.readdir(dir, async function (err, names) {
          if (err) {
            reject(err);
          } else {
            let fileList = await dirForEach(names, dir);
            relove(fileList);
          }
        });
      });
    }
    async function dirForEach(names, dir) {
      //下面方法多走一次循环
      return new Promise(function (RES, REJ) {
        Promise.all(
          names.map((name) => {
            return new Promise(function (reslove, reject) {
              try {
                let theDir = path.join(dir, name);
                fs.stat(theDir, async function (err, stats) {
                  if (err) {
                    throw new Error('获取 "' + theDir + '" 失败！');
                  } else {
                    let isFile = stats.isFile(); //是文件
                    let isDir = stats.isDirectory(); //是文件夹
                    if (isFile) {
                      if (test === null || test.test(name)) {
                        reslove({
                          name: name,
                          type: "file",
                          path: theDir.replace(/\\/g, "/"),
                          dir: theDir,
                        });
                      } else {
                        reslove(null);
                      }
                    }
                    if (isDir) {
                      if (deep) {
                        const child = await getDir(theDir);
                        reslove({
                          name: name,
                          type: "dir",
                          dir: theDir,
                          child,
                        });
                      } else {
                        reslove(null);
                      }
                    }
                  }
                });
              } catch (e) {
                reject(e);
              }
            });
          })
        )
          .then((res) => {
            //过滤处理 所有数组
            let list = [];
            for (let item of res) {
              if (item) {
                if (item.type === "file") {
                  list.push(item);
                } else if (item.type === "dir") {
                  if (flat) {
                    for (let child of item.child) {
                      list.push(child);
                    }
                  } else {
                    list.push(item);
                  }
                }
              }
            }
            RES(list);
          })
          .catch((err) => {
            REJ(err);
          });
      });
    }
  },
};
