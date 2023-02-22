import { ElMessage, ElMessageBox } from "element-plus";
let length = 2 //消息最大数量
let sayMessage = {
  Messages:new Array(length),
  lounge:new Array(),//稍后加载的值
  next(){
    if(sayMessage.lounge.length){
      let config = sayMessage.lounge.splice(0,1)[0]
      sayMessage.Message(config)
    }
  },
  //清空消息
  clear(){
    for(let i in this.Messages){
      this.close(i)
    }
  },
  close(ind:any){
    this.Messages[ind]=null
  },
  //申请消息，如果消息显示数量是满的，就加入到队列
  Message(config:any){
    let ind = -1 
    while(ind++<length-1){
      if(!this.Messages[ind]){
        if(config.onClose)config.onClose = ()=>{config.onClose();this.close(ind);this.next()}
        else config.onClose = ()=>{this.close(ind);this.next()  }  
        let mes = ElMessage(config)
        this.Messages[ind] = mes
        return
      }
    }
    this.lounge.push(config)
  }
}
export default sayMessage
