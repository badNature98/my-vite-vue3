import setting from '@/settings'
function getKey(key: string) {
  return setting.storeKey + key
}

/**
 * window.localStorage 浏览器永久缓存
 */
export const localStorage = {
  // 设置永久缓存
  set(key: string, val: any) {
    window.localStorage.setItem(getKey(key), JSON.stringify(val));
  },
  // 获取永久缓存
  get(key: string) {
    const json: any = window.localStorage.getItem(getKey(key));
    return JSON.parse(json);
  },
  // 移除永久缓存
  remove(key: string) {
    window.localStorage.removeItem(getKey(key));
  },
  // 移除全部永久缓存
  clear() {
    window.localStorage.clear();
  }
};

/**
 * window.sessionStorage 浏览器临时缓存
 */
export const sessionStorage = {
  // 设置临时缓存
  set(key: string, val: any) {
    window.sessionStorage.setItem(getKey(key), JSON.stringify(val));
  },
  // 获取临时缓存
  get(key: string) {
    const json: any = window.sessionStorage.getItem(getKey(key));
    return JSON.parse(json);
  },
  // 移除临时缓存
  remove(key: string) {
    window.sessionStorage.removeItem(getKey(key));
  },
  // 移除全部临时缓存
  clear() {
    window.sessionStorage.clear();
  }
};
