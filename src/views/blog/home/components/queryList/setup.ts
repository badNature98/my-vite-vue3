import { Ref, ref } from "vue";
import { query, doQuery } from "@/layout/template/Blog/setup";
import { getFileByPath } from "@/api/local/index";
export const list: Ref<any> = ref([]);

export const bindQuery = () => {
  let newFunc = (text: string) => {
    fetchData(text);
  };
  doQuery.bind(newFunc);

  return () => {
    doQuery.unbind(newFunc);
  };
};

/**
 * @name 后台查询文件
 * @param quertText 查询文字
 * @returns []
 */
export async function fetchData(quertText: string = "") {
  console.log("quertText", quertText);
  if (list.value.length) return list;
  const { data } = await getFileByPath({ flat: true });
  list.value = data || [];
  return list;
}
fetchData();
