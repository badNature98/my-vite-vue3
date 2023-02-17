import request from '@/utils/request';
/**
 * 根据条件获取字典表
 * @returns
 */
 export function listByParam(params: any) {
  return request({
    url: '/base/dict/listByParam',
    method: 'get',
    params
  });
}
