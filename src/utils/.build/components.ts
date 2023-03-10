//这个包是用于批量注册全局组件
import app from "@/app";
async function createComponents(item: any, key?: string) {
  if (item instanceof Function) {
    item = await item();
  }
  let name = key || item.default.name || item.default.__name;
  if (!name) throw Error(`请定义组件的名称！ 组件地址${item.default.__file}`);
  app.component(`${name}`, item.default);
}
export function componentPathToName(components: any, suffix: string = ""): any {
  let reg = new RegExp(`^(\\.?\/?(.*\/)?(?!index))|(\/index)?${suffix}$`, "g");
  for (let key in components) {
    /^(\.?\/?(.*\/)?(?!index))|(\/index)?.vue$/g;
    let name = key.replace(reg, "");
    components[name] = components[key];
    delete components[key];
  }
  return components;
}
export default ({
  value,
  rule = () => true,
}: {
  value: Record<string, any>;
  rule?: Function;
  call?: Function;
}): void => {
  componentPathToName(value, ".vue");
  for (let key in value) {
    if (rule(value[key], key)) {
      createComponents(value[key], key);
    }
  }
};
