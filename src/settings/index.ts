
const defaultSettings : DefaultSettings = {
  //记录地址
  baseUrl: 'http://localhost:3322',
  //localStore 用的key 
  storeKey: 'hr',
  title: '石油物探技术研究院有限公司HSE管理系统',
  showSettings: true,
  tagsView: true, // 是否显示tagView
  fixedHeader: false, // 是否显示Logo
  sidebarLogo:false,
  errorLog: 'production',
  //intelligence(前端导出路由)和all(后端导出路由)两种方式
  authentication:'intelligence',
  //路由的Menu 改变的最小值 x < menuCollapse 不想折叠 可以设置为 -Infinity
  menuCollapse:960,
};

interface DefaultSettings {
  baseUrl: string;
  storeKey: string;
  title: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  errorLog: string;
  authentication:string;
  menuCollapse:number;
}


export default defaultSettings;
