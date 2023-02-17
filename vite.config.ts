// import settings from './src/settings'
import { defineConfig ,loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
//处理ICON图标
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode,process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      createHtmlPlugin({
        inject:{
          data:{
            title:env.VITE_APP_TITLE
          }
        }
      })
    ],
    //网络代理
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:3322',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    },
    css:{
      preprocessorOptions:{
        scss:{
          javascriptEnabled:true
        }
      }
    }
  };
});
