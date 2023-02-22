/**
 * 登录响应类型声明
 */
export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  refresh_token:string;
  expires_in:number;
  scope:string;
  deptId:string;
  userId:string;
  username:string;
  jti?:string;
}

/**
 * 登录表单类型声明
 */
export interface LoginFormData {
  username: string;
  password: string;
  grant_type: string;
  code: string;
  uuid: string;
}
