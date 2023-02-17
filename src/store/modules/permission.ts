import { PermissionState } from "@/types/store/permission";
import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import { listRoutes } from "@/api/user/login";
import { isExternal } from "@/utils/validate";
import settings from "@/settings/index";
import otherRouters from "@/router/other/index";

const { authentication } = settings;

const modules = import.meta.glob("../../views/**/**.vue");
//app 内框架
export const Layout = () => import("@/layout/index.vue");
//添加默认重定向
export const filterRoutes = (routers: RouteRecordRaw[], baseUrl = "") => {
  return routers
    .filter((a: RouteRecordRaw) => a)
    .map((route: any) => {
      route.path =
        route.path !== "*" && !isExternal(route.path)
          ? resloveUrl(baseUrl, route.path)
          : route.path;
      if (route.children) {
        route.children = filterRoutes(route.children, route.path);
        if (!route.redirect && route.children[0])
          route.redirect = route.children[0].redirect
            ? route.children[0].redirect
            : route.children[0].path;
      }
      return route;
    });
};
const resloveUrl = (a: string, b: string) => {
  if (a[0] !== "/") a = "/" + a;
  a = a.replace(/\/$/, "");
  b = b.replace(/\//, "");
  return a + "/" + b;
};

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role);
      }
    });
  }
  return false;
};

export const filterAsyncRoutes = async (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res: RouteRecordRaw[] = [];
  await Promise.all(
    routes.map(
      (route) =>
        new Promise(async (reslove, reject) => {
          try{
          const tmp = { ...route } as any;
          // if (hasPermission(roles, tmp)) {
          if (tmp.component == "Layout") {
            tmp.component = Layout;
          } else {
            let component;
            if (tmp.component instanceof Function) {
              // component = (await tmp.component()).default;
              // component = await tmp.component();
              component = tmp.component
            } else {
              component = modules[`../../views/${tmp.component}.vue`] as any;
            }
            if (component) {
              tmp.component = component;
            } else {
              tmp.component = modules[`../../views/error-page/404.vue`];
            }
          }
          res.push(tmp);

          if (tmp.children) {
            tmp.children = await filterAsyncRoutes(tmp.children, roles);
          }
          reslove(tmp)
          // }
        }catch(e){
          reject(e)
        }
        })
    )
  );
        
  return res;
};
function getName(text: string) {
  if (text.indexOf("?") != -1) {
    text = text.substring(0, text.indexOf("?"));
  }
  const test = text.match(/(?!\/)[(a-z)(A-Z)]+/g);
  if (test && test.length) {
    return test;
  }
  return null;
}
function getQuery(text: string) {
  const urlobj: any = {};
  if (text.indexOf("?") != -1) {
    text = text.substring(text.indexOf("?") + 1);
    const dataArr = text.split("&");
    dataArr.forEach((src) => {
      const key = src.substring(0, src.indexOf("="));
      const value = src.substring(src.indexOf("=") + 1);
      urlobj[key] = value;
    });
  }
  return urlobj;
}

function getChildRouter(item: any, itfe: any, roles: any) {
  let pagePath = `@/views/${item.url}.vue`;
  let name: any = getName(item.url);
  let queryURL = getQuery(item.url);
  name = name ? name[name.length - 1] : null;
  let ite: any = {
    path: itfe.path + "/" + name + item.Id,
    name: name + item.Id,
    component:
      modules[
        `../../views/${
          item.url.indexOf("?") != -1
            ? item.url.substring(0, item.url.indexOf("?"))
            : item.url
        }.vue`
      ],
    meta: {
      title: item.text,
      icon: item.iconurl,
      affix: false,
      hidden: false,
      keepAlive: true,
      Role: roles,
      query: queryURL,
    },
  };
  if (item.TreeNode) {
    ite.children = [];
    if (item.TreeNode instanceof Array) {
      for (let a of item.TreeNode) {
        ite.children.push(getChildRouter(a, itfe, roles));
      }
    } else {
      ite.children.push(getChildRouter(item.TreeNode, itfe, roles));
    }
  }
  return ite;
}

function getRouter(arr: any, roles: any) {
  let list = [];
  if (!(arr instanceof Array)) {
    arr = [arr];
  }
  for (let route of arr) {
    let ite: any = {
      path: "/" + route.Id,
      name: route.ywtext + route.Id,
      component: Layout,
      meta: {
        title: route.text,
        icon: route.iconurl,
        affix: false,
        hidden: false,
        keepAlive: true,
        Role: roles,
      },
    };
    if (route.TreeNode) {
      ite.children = [];
      if (route.TreeNode instanceof Array) {
        for (let item of route.TreeNode) {
          ite.children.push(getChildRouter(item, ite, roles));
        }
      } else {
        ite.children.push(getChildRouter(item, ite, roles));
      }
    }
    list.push(ite);
  }
  return list;
}

const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    //获取菜单
    generateRoutes(roles: string[], userCode: string) {
      return new Promise(async (resolve, reject) => {
        if (authentication === "all") {
          //后端导入路由
          listRoutes(userCode)
            .then((response) => {
              const asyncRoutes = response.data.TreeNode[0].TreeNode;
              const accessedRoutes = getRouter(asyncRoutes, roles);
              this.setRoutes(accessedRoutes);
              resolve(accessedRoutes);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          //前段导入路由
          const asyncRoutes: any[] = [];
          //默认会根据权限来导入
          const list = await Promise.all(
            roles.map((role) =>
              (async () => {
                let path = `./${role}.ts`;
                let list: any[] = [];
                if (otherRouters[path]) {
                  list = (await otherRouters[path]()).default;
                }
                for (let route of list) {
                  asyncRoutes.push(route);
                }
                return list;
              })()
            )
          );
          // const accessedRoutes = getRouter(asyncRoutes, roles);
          const accessedRoutes =  await filterAsyncRoutes(filterRoutes(asyncRoutes), roles) 
          this.setRoutes(accessedRoutes);
          resolve(accessedRoutes);
        }
      });
    },
  },
});

export default usePermissionStore;
