import service from '@/utils/request'

/**
 * @name 获取目录的文件
 */
export function getFileByPath (params?:{test ?:any, deep ?:boolean, flat ?:boolean}){
  return service({
    url:'/files/getFile',
    method:'get',
    params
  })
}

export function download(params:{dir:string}){
  return service({
    url:'/files/download',
    method:'get',
    params
  })
}
