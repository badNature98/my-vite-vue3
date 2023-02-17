import { defineStore } from 'pinia';
//登录 退出 获取用户信息
import { listByParam } from '@/api/dict';
const DictLisst :any= {};
const useUserStore = defineStore({
  id: 'dict',
  state: (): any => ({
    filterDict(val: any, key: string | number) {
      if (DictLisst && DictLisst[key]) {
        for (const dict of DictLisst[key]) {
          if (String(dict.dictValue) === String(val)) {
            return dict.dictName;
          }
        }
      }
      return val;
    },
    dict: DictLisst
  }),
  actions: {
    async getDict() {
      const { data } = await listByParam({
        dictLevel: 1
      });
      if (data && data.length) {
        for (const dict of data) {
          this.getDictCHild(dict);
        }
      }
    },
    async getDictCHild(dict: any) {
      const { data } = await listByParam({
        parentId: dict.id,
        dictType: dict.dictType,
        dictLevel: 2
      });
      this.dict[dict.dictType] = data;
    }
  }
});

export default useUserStore;
