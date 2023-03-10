import useUserStore from './modules/user';
import useAppStore from './modules/app';
import usePermissionStore from './modules/permission';
import useSettingStore from './modules/settings';
import useTagsViewStore from './modules/tagsView';
import useDictStore from './modules/dict';
import useMessage from './modules/message';
import useOS from './modules/OS';
import useController from './modules/controller'
const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore(),
  dict: useDictStore(),
  message:useMessage(),
  OS:useOS(),
  controller:useController(),
});

export default useStore;
