import router from '@/router';
import { ElMessage } from 'element-plus';
import useStore from '@/store';
// import 'nprogress/nprogress.css';
// import NProgress from 'nprogress';
// NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏
const NProgress = {
  start(){},
  done(){}
}

// 白名单路由
const whiteList = ['/login','/signup'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user, dict, permission } = useStore();
  const hasToken = user.token;
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      //判断有没有权限
      const hasRoles = user.roles.length > 0;
      if (hasRoles) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          if (to.meta.query && to.fullPath.indexOf('?') === -1) {
            if (Object.keys(to.meta.query).length) {
              for (let key in to.meta.query) {
                to.query['key'] = to.meta.query[key];
              }
              next(to);
            } else {
              next();
            }
          } else {
            next();
          }
        }
      } else {
        try {
          await user.getAccessToken();
          // await dict.getDict();
          const roles = user.roles;
          const accessRoutes: any = await permission.generateRoutes(
            roles,
            user.userCode
          );
          accessRoutes.forEach((route: any) => {
            router.addRoute(route);
          });
          next({ ...to, name:undefined,replace: true });
        } catch (error) {
          // 移除 token 并跳转登录页
          await user.resetToken();
          ElMessage.error((error as any) || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (to.path === '/login' && to.query.up){
      try{
        const res = await user.login({
          username:'str',
          password: 'string',
          grant_type: 'string',
          code: 'string',
          uuid: 'string'
        },'encode')
        if(res.accessToken || res.refreshToken)
        next({ path: to.query.redirect || '/', query: {...to.query,up:undefined} });
        else throw Error('自动登录失败！')
        return
      }catch(e){
        next({...to,query:{...to.query,up:undefined}});
      }
    }
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
