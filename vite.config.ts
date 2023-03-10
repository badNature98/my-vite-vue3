// import settings from './src/settings'
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
//处理ICON图标
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    base: "./",
    build: {
      target: "modules",
      outDir: "dist12", //指定输出路径
      assetsDir: "assets", // 指定生成静态资源的存放路径
      minify: "terser", // 混淆器，terser构建后文件体积更小
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
    ],
    //网络代理
    server: {
      https: false, //是否开启代理
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://localhost:2581",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    //路径代理
    resolve: {
      // Vite路径别名配置
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
