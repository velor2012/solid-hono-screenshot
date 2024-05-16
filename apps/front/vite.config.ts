import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    visualizer({
        // 打包完成后自动打开浏览器，显示产物体积报告
        open: true,
      }),
  ],
  server: {
    port: 5174,
  },
  build: {
    target: 'esnext',
  },
});
