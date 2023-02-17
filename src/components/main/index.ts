//获取本文件下所有的组件
import setTemp from '@/utils/.build/components'
const components: Record<string, any> = import.meta.glob("./**/*.vue",{ eager: true });
setTemp({value:components})
