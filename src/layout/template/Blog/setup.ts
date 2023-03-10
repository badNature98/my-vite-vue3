import { Ref, ref } from "vue";
export const query: Ref<string> = ref("");
type queryF = (query:string)=>void
export const doQuery: {
  send: Function;
  unbind: (f:queryF)=>void;
  bind: (f:queryF)=>queryF;
  list: Function[];
} = {
  send() {
    for (let f of doQuery.list) {
      f(query.value);
    }
  },
  unbind(uf){
    let ind = 0
    for (let f of doQuery.list) {
      if(f === uf){
        doQuery.list.splice(ind,1)
        break
      }
      ind++
    }
    console.log(doQuery.list)
  },
  bind(f) {
    doQuery.list.push(f);
    return f.bind(null, query.value);
  },
  list: [],
};
