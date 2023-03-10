/**
   测试连接的 message _page_message_test_
   1、使用方法需要先引入
   2、var mes = new pageMessage(config?:{})
      config = {
        localLength: 10, //储存信息的长度 这个字段是记录发送接收的历史记录
        input: true, //是否开启输入 开启输入后才能接收其他界面来的信息
        output: true, //是否开启输出 开启输出之后才有 send 发送方法
      }
   3、mes.connection(conf)
      conf = {//url 和 target 二选一
        url:?'http://xxx', //连接的地址，此值一定要标准。
        mode:? //选填 通讯方式 默认是 'all'(双向通讯) 'input'(输出到target) 'output'(接收target)
        target:? //选填 但是发送信息时必填 是iframe 或者 
      }
   4、mes.bind(conf)
      //conf 类型是 Function 或者 没有 type 属性时 都会默认赋值 type 为 'default'
      //-- bind 后会返回绑定的 conf 对象 可以自定义修改 里面的 type .
      conf = Function | {
        call:Function,
        type:? 'default' 
      }
   5、mes.send(conf)
      //参数必须为此格式 
      conf =  {
        message: '发送的信息'
        type:? 'default' //默认为 default 
      }
    
      iframe 子连父 必须要进行 父通讯子一次 才可以 反向通讯
 */
(function (controller) {
  return (controller.pageMessage = function (config) {
    let defaultConfig = {
      localLength: 10, //储存信息的长度
      input: true, //是否开启输入
      output: true, //是否开启输出
    };
    //连接测试
    const that = this;
    //处理发送的数据
    function process(data) {
      if (Object.prototype.toString.call(data) === "[object Object]") {
        if (!data.type) data.type = "default";
        return data;
      } else {
        throw Error(
          `参数错误 send 方法发送的信息，只能为 Object \n data => ${data}`
        );
      }
    }
    //连接方法
    function connection(path, config) {
      this[path][config.url] = config;
      if(config.target){
        config.target.contentWindow.addEventListener('load',function(){
          config.target.contentWindow.postMessage(
            process({message:'_page_message_test_'}),
            config.url
          );
        })
      }
    }
    this.config = Object.assign(defaultConfig, config);
    if (this.config.localLength)
      //记录操作 可设置记录范围
      this.local = {};
    //储存的信息
    this.message_list = [];
    //连接ip
    this.connection = function (c) {
      if(!c.url && !c.target) throw new Error(`参数错误 connection 方法连接时，Object 必须要 url 属性或 target 其中一个。\n data => ${c}`)
      const { mode = "all" } = c;
      if (!c.url) c.url = window.location.origin;
      if (c.target && !c.target.contentWindow)
        c.target = { contentWindow: c.target };
      if (mode === "all") {
        if (this.config.input) connection.call(this, "stack_input", c);
        if (this.config.output) connection.call(this, "stack_output", c);
      } else if (mode === "output") {
        if (this.config.input) connection.call(this, "stack_input", c);
      } else if (mode === "input") {
        if (this.config.output) connection.call(this, "stack_output", c);
      }
    };
    //发送信息
    if (this.config.output)
      //输出列表
      (this.stack_output = {}),
        (this.send = function (c) {
          //需要处理输入的函数
          for (let i in this.stack_output) {
            if (this.stack_output[i].target) {
              //发送信息
              this.stack_output[i].target.contentWindow.postMessage(
                process(c),
                this.stack_output[i].url
              );
              //记录发送记录
              if (that.config.localLength) {
                if (that.local[origin]) {
                  that.local[origin].output.push(c);
                  let len =
                    that.local[origin].output.length - that.config.localLength;
                  if (len > 0) that.local[origin].output.splice(0, len);
                } else {
                  that.local[origin] = {
                    input: [],
                    output: [c],
                  };
                }
              }
            }
          }
        });
    //监听接收事件
    if (this.config.input)
      //输入列表
      (this.stack_input = {}),
        (this.requestList = []),
        (this.bind = function (val) {
          if (val instanceof Function) {
            val = { call: val, type: ["default"] };
            this.requestList.push(val);
          } else if (val && val.call instanceof Function) {
            if (!(val.type instanceof Array))
              val.type = [val.type || "default"];
            this.requestList.push(val);
          }
          return val;
        }),
        //获取信息
        window.addEventListener(
          "message",
          (event) => {
            const origin = event.origin;
            const target = event.source;
            const { message, type } = event.data;
            // 通常，onmessage()事件处理程序应当首先检测其中的origin属性，忽略来自未知源的消息
            if (!that.stack_input[origin]) return;
            // 激活反向通讯
            if (!that.stack_input[origin].target)
              that.stack_input[origin].target = { contentWindow: target };
            //是否测试连接
            if(message === '_page_message_test_' && type === 'default') return 
            //记录接收记录
            if (that.config.localLength) {
              if (that.local[origin]) {
                that.local[origin].input.push(event);
                let len =
                  that.local[origin].input.length - that.config.localLength;
                if (len > 0) that.local[origin].input.splice(0, len);
              } else {
                that.local[origin] = {
                  input: [event],
                  output: [],
                };
              }
            }
            for (let b of this.requestList) {
              if (b.type.includes(type)) b.call(message, event);
            }
          },
          false
        );
  });
})(this || window);
