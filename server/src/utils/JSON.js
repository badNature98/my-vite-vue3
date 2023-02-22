module.exports = {
  stringify(req) {
    let cache = [];
    let json_str = JSON.stringify(req, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
      return value;
    });
    cache = null; //释放cache
    return json_str
  },
};
