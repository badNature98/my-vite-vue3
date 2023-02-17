import { defineStore } from 'pinia';

const useAppStore = defineStore({
  id: 'message',
  state: () => ({
    list:[],
  }),
  actions: {
    message(language: string) {
      
    },
  },
});

export default useAppStore;
