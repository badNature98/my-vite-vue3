import {
  LoginFormData,
  LoginResponseData
} from '@/types/api/login/login';

import request from '@/utils/request';
import { AxiosPromise } from 'axios';

export function DES_login(params : LoginFormData): AxiosPromise<LoginResponseData>{
  return request({
    url: '/oauth/token2',
    method: 'get',
    params,
    headers: {
      Authorization: 'once'
    }
  });
}


/**
 * 登录
 * @param data
 */
export function login(params: LoginFormData): AxiosPromise<LoginResponseData> {
  return new Promise(function (reD) {
    const retData :any= {
      "code": "00000",
      "data": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJkZXB0SWQiOjIsImV4cCI6MTY2MDU0NDk1MiwidXNlcklkIjoyLCJhdXRob3JpdGllcyI6WyJBRE1JTiJdLCJqdGkiOiI4NDA1MGE1NS05ZjFkLTRlNmUtYjZmMC03YjczMjc5NTUwNTMiLCJjbGllbnRfaWQiOiJtYWxsLWFkbWluLXdlYiIsInVzZXJuYW1lIjoiYWRtaW4ifQ.X1XSqgHQleXIUPaTp1Qa7nySwWpyFXJyA2aq0WMCLs_tc51NfUZjrU6ipcoo9WHsAXJWZ6QPDTOisApE0kdG3EZhf1f0MvNBkfsV2NI5FFa2IXdw5c9vCT4-VN-jKDBjddPfLE_UbJcu2AxLqvhmmH-rTjN8Wd-v9xdHKu9t5kuve7F1OwijiM1bUApRiZ97vB2KKcCLLqog4LTUGZ5uff6BbUsJvnQAZgcqr_q-N8uSyiireAjTZma27MFE5oaoN6LN9ywv7mrxGS-ILWPURVMrlk6oBsUHLeg4zc2f-LlTLAjfQIS2Ye1CJ77SWPm7u48v0g96UBxrDo6--z2-5Q",
        "refreshToken": "bearer",
        "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJhdGkiOiI4NDA1MGE1NS05ZjFkLTRlNmUtYjZmMC03YjczMjc5NTUwNTMiLCJkZXB0SWQiOjIsImV4cCI6MTY2MDU0ODU1MiwidXNlcklkIjoyLCJhdXRob3JpdGllcyI6WyJBRE1JTiJdLCJqdGkiOiI3MmZmYjU2Zi05ZThiLTRmZmYtOTBkZi1mY2E3MDA0MmQ1ODEiLCJjbGllbnRfaWQiOiJtYWxsLWFkbWluLXdlYiIsInVzZXJuYW1lIjoiYWRtaW4ifQ.Ujyil0FXIQ8WxuBJJgzglCJaXk6eXfBUGXcwPCjehMIWCHdNDAIE0S2H8qlm8GgJBIUunisBuPjKFFZGpQjS69Ixvs6HVxbCmgQd8tRTMhMdSE6n5vfaQbdApN-Y9NKJMn_LVQToXcobkKnoW1kD_VhdG8grjMAiG1vFNY8RJVNw_PBr1mpL6n9H5Rx5C3ZSxkV2SMopmPVovrXy_EkEG9OIoKUFEzKFw1H0mO4uUD9vi1b37wXxEwQ-8hSet--9NppEYPqFKYes_omNCIqj8dOudNppC6O5WAl_x3fJMEk7L8UDzlnNK3dRFLdASjJRVVgOZIWTNcN_D555vugtOA",
        "expires_in": 3599,
        "scope": "all",
        "deptId": "2",
        "userId": "2",
        "username": "admin",
        "jti": "84050a55-9f1d-4e6e-b6f0-7b7327955053"
      },
      "msg": "一切ok"
    }
    reD(retData);
  });
}
/**
 * 刷新token
 * @param params
 * @returns
 */
export function getAccessToken(params: {
  accessToken: string;
  refreshToken: string;
}) {
  return request({
    url: '/oauth/token/refresh',
    method: 'get',
    params
  });
}
/**
 * 获取当前用户信息
 * @returns
 */
export function principal() {
  return request({
    url: '/oauth/principal',
    method: 'get'
  });
}

/**
 * 获取路由列表
 */
// export function listRoutes() {
//   return new Promise(function (reD) {
//     reD(menuList);
//   });
// }
export function listRoutes(username:string) {
  return request({
    url: '/oauth/getMenu?username=' + username,
    method: 'get'
  });
}

/**
 * logout
 */
export function logout() {
  return new Promise(function (reD) {
    reD('200');
  });
}


/**
 * 游客登录
 * @param data
 */
 export function visitor_login(params: LoginFormData): AxiosPromise<LoginResponseData> {
  return new Promise(function (reD) {
    const retData:any = {
      "code": "00000",
      "data": {
        "accessToken": "visitor",
        "refreshToken": "bearer",
        "refresh_token": "visitor",
        "expires_in": 3599,
        "scope": "all",
        "deptId": "2",
        "userId": "2",
        "username": "admin",
        "jti": "84050a55-9f1d-4e6e-b6f0-7b7327955053"
      },
      "msg": "一切ok"
    }
    reD(retData);
  });
}
