import service from '@/utils/request'

/**
 * @name 获取目录的文件
 */
export function getFileByPath (){
  return service({
    url:'/files/getFile',
    method:'get'
  })
}
