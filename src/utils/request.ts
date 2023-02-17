import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  CancelToken,
  AxiosResponse,
} from "axios";
import say from '@/utils/sayMessage'
import { ElMessage, ElMessageBox } from "element-plus";
import { localStorage } from "@/utils/storage";
import setting from "@/settings";
import useStore from "@/store";
let refreshToking = false;
let requests: any[] = [];
let loadingInstance;

//记录请求，可以来取消请求。
const cancleBook: any = {
  message:'连接已取消。',
  async: [], // 同部请求
  sync: [], // 同步请求
  add(request: any, type: string = "async") {
    this[type].push(request);
  },
  cancle_async(mes?:string|number) {
    for (let item of this.async) {
      item(mes);
    }
  },
  cancle_sync(mes?:string|number) {
    for (let item of this.sync) {
      item(mes);
    }
  },
  cancle_all(mes?:string|number) {
    this.cancle_sync(mes);
    this.cancle_async(mes);
  },
};
/**
 * @name 清除axios 的请求
 * @param type 
 */
export const cancel = function (parm?:{type?: string, message?:string|number}) {
  const {type='all',message=cancleBook.message} = parm || {}
  setTimeout(() => {
    try {
      cancleBook[`cancle_${type}`](message);
    } catch (e) {}
  });
};
// 创建 axios 实例
const service = axios.create({
  baseURL:
    // setting.baseUrl,
    import.meta.env.VITE_APP_NODE_ENV === "production"
      ? setting.baseUrl
      : import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});
// 请求拦截器

const requestConf = function (config: InternalAxiosRequestConfig) {
  if (!config.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }
  const { user } = useStore();
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  config.cancelToken = new axios.CancelToken((c) => {
    cancleBook.add(c);
  }); // 每个请求都有一个cancel函数
  return config;
};
/**
 * @description axios请求拦截器
 */
service.interceptors.request.use(requestConf, (error: any) => {
  return Promise.reject(error);
});

// 401 刷新token
const tryRefreshToken = async (config: any) => {
  const { user } = useStore();
  if (!refreshToking) {
    refreshToking = true;
    try {
      await user.getAccessToken();
      // 已经刷新了token，将所有队列中的请求进行重试
      requests.forEach((cb) => cb(user.token));
      requests = [];
      return service(requestConf(config));
    } catch (error) {
      console.error("refreshToken error =>", error);
      refreshToking = false;
      // router.push({ path: '/login', replace: true }).then(() => {})
    } finally {
      refreshToking = false;
    }
  } else {
    return new Promise((resolve) => {
      // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
      requests.push(() => {
        resolve(service(requestConf(config)));
      });
    });
  }
};
const handleData = function (response: AxiosResponse) {
  const { status, msg } = response.data;
  if (status === 200) {
    return response.data;
  } else {
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }
    if (response.status === 200) {
      return response;
    }
    ElMessage({
      message: msg || "系统出错",
      type: "error",
    });
    return Promise.reject(new Error(msg || "Error"));
  }
};
// 响应拦截器
service.interceptors.response.use(
  (response) => handleData(response),
  async (error) => {
    console.log(error)
    if (!error.response){//取消了
      const {message} = error
      say.Message({
        message,
        showClose:true
      })
      return 
    } 
    const { state, status, msg } = error.response.data;
    if (error.response === undefined) {
      ElMessage({
        message: msg || "系统出错",
        type: "error",
      });
      return Promise.reject(new Error(msg || "Error"));
    }
    if (status === 401 || state === 401) {
      // token 过期
      return await tryRefreshToken(error.config);
      // localStorage.clear(); // 清除浏览器全部缓存
      // window.location.href = '/'; // 跳转登录页
      // ElMessageBox.alert(msg||'当前页面已失效，请重新登录', '提示', {});
    } else {
      return handleData(error.response);
    }
  }
);

// 导出 axios 实例
export default service;
