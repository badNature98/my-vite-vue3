import { defineStore } from "pinia";
import { LoginFormData } from "@/types/api/login/login";
import { UserState } from "@/types/store/user";
import { localStorage } from "@/utils/storage";
//登录 退出 获取用户信息
import {
  visitor_login,
  login,
  DES_login,
  logout,
  getAccessToken,
  principal,
} from "@/api/user/login";
//获取登录权限
import { resetRouter } from "@/router";

const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    retoken: localStorage.get("retoken") || "",
    token: localStorage.get("token") || "",
    userName: "",
    userCode: "",
    deptName: "",
    deptCode: "",
    nickname: "",
    departLeaderCode: "",
    departLeaderName: "",
    avatar: "",
    roles: [],
    perms: [],
    toDo: {
      11143: ["feedBackList11149"],
      feedBackList11149: 10,
    },
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 获取登录用户信息
     */
    async RefreshUser() {
      let userInfo
      if(this.token === 'visitor'){
        userInfo={
          username:'游客',
          userCode:'visitor',
          deptName:'游客',
          deptCode:'visitor',
          departLeaderName:'游客',
          departLeaderCode:'visitor',
        }
      }else{
        const { data } = await principal();
        userInfo=data
      }
      this.roles = ["blog",'_test'];
      this.userName = userInfo.username;
      this.userCode = userInfo.userCode;
      this.deptName = userInfo.deptName;
      this.deptCode = userInfo.deptCode;
      this.departLeaderCode = userInfo.departLeaderCode;
      this.departLeaderName = userInfo.departLeaderName;
      (async () => {
        this.toDo.feedBackList11149 = 10;
      })();
    },
    /**
     * 刷新登录状态 单个
     * @param {*} param0
     */
    async getAccessToken() {
      try {
        const params = {
          accessToken: this.token || localStorage.get("token"),
          refreshToken: this.retoken || localStorage.get("retoken"),
        };
        if(params.accessToken === 'visitor' || params.refreshToken === 'visitor'){
          await this.setToken(params);
          await this.RefreshUser();
        }else
        if (params.accessToken || params.refreshToken) {
          const { data } = await getAccessToken(params);
          if (data) {
            params.accessToken = data;
            await this.setToken(params);
            await this.RefreshUser();
          } else throw Error("刷新失败！");
        } else throw Error("刷新失败！");
      } catch (e:any) {
        this.logout();
        throw Error(e);
      }
    },
    /**
     * 储存token
     * @param loginData
     * @returns
     */
    setToken({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) {
      accessToken = accessToken || localStorage.get("token");
      refreshToken = refreshToken || localStorage.get("retoken");
      //浏览器生命周期起的 token
      this.retoken = refreshToken;
      this.token = accessToken;
      // setTimeout(() => {
      //   this.token = 'isNO';
      // }, 5000);
      //用来刷新 token 的历史数据
      localStorage.set("retoken", refreshToken);
      localStorage.set("token", accessToken);
    },
    /**
     * 登录
     */
    login(loginData: LoginFormData, type?:string) {
      return new Promise((resolve, reject) => {
        let useLogin
        if(loginData.grant_type === 'visitor'){
          useLogin=visitor_login
        }else if(type === "encode"){
          useLogin=login
        }else {
          useLogin=login
        }
        useLogin(loginData)
          .then(async (response) => {
            if (response) {
              //登录储存数据
              const data = response.data;
              await this.setToken(data);
              resolve(data);
            } else reject("登录失败！");
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）演示
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        const data = {
          userId: "0",
          nickname: "系统管理员",
          avatar: "",
          roles: ["ADMIN"],
          perms: [
            "sys:user:view",
            "sys:user:edit",
            "sys:user:add",
            "sys:user:delete",
          ],
        };
        const { nickname, avatar, roles, perms } = data;
        if (!roles || roles.length <= 0) {
          reject("getUserInfo: roles must be a non-null array!");
        }
        this.nickname = nickname;
        this.avatar = avatar;
        this.roles = roles;
        this.perms = perms;
        resolve(data);
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            localStorage.remove("token");
            localStorage.remove("retoken");
            this.retoken = "";
            this.token = "";
            this.RESET_STATE();
            resetRouter();
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        localStorage.remove("token");
        this.RESET_STATE();
        resolve(null);
      });
    },
  },
});

export default useUserStore;
