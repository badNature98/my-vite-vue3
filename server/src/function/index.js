//常用方法储存的地方
function deepCopy(obj, len = 0) {
  // 递归调用
  if (obj instanceof Function) {
    return '[object Function]';
  }

  if (len++ > 5) return '[length out]';
  // 判断传入的值是否为一个对象

  if (obj === null && typeof obj !== "object") {
    return obj;
  }
  // 判断对象的类型 注意这里不考虑包装类对象
  if (Object.prototype.toString.call(obj) === "[object Date]") {
    // return new Date(obj);
    return Object.prototype.toString.call(obj)
  }
  if (Object.prototype.toString.call(obj) === "[object RegExp]") {
    // return new RegExp(obj);
    return Object.prototype.toString.call(obj)
  }
  if (Object.prototype.toString.call(obj) === "[object Undefined]") {
    // return new Error(obj);
    return Object.prototype.toString.call(obj)
  }
  // 判断对象是类
  let newObj = Array.isArray(obj) ? [] : {};
  for (let item in obj) {
    if (typeof obj[item] === "object") {
      newObj[item] = deepCopy(obj[item], len);
    } else {
      if (obj[item] instanceof Function) {
        newObj[item] = null;
      }else{
          newObj[item] = obj[item];
  
        
      }

    }
  }
  return newObj;
}
module.exports = {
  deepCopy,
};
