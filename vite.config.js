import { defineConfig } from "vite";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import FullReload from "vite-plugin-full-reload";
import fg from "fast-glob";
import path from "path";
import { data } from "./src/ejs/data/data";

const htmlPages = fg.sync(["**/*.html", "!**/_*.html"], {
  cwd: path.resolve(__dirname),
  onlyFiles: true,
  ignore: ["**/node_modules/**", "dist", "**/wordpress/**", "**/theme-wp/**"],
});

export default defineConfig({
  root: "src",
  publicDir: path.resolve(__dirname, "public"),
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (info) => {
          const [name = "asset"] = info.names ?? [];
          if (name.endsWith(".css")) return "css/[name]-[hash][extname]";
          return "assets/[name][extname]";
        },
      },
      input: htmlPages.map((p) => path.resolve(__dirname, p)),
    },
    polyfillModulePreload: false,
  },
  plugins: [
    true &&
      iconsSpritesheet({
        inputDir: "src/sprite",
        outputDir: path.resolve(__dirname, "public/img/icons"),
        fileName: "sprite.svg",
        cwd: process.cwd(),
        formatter: "biome",
        iconNameTransformer: (iconName) => iconName,
      }),
    ViteEjsPlugin({
      ...data,
    }),
    FullReload(["src/ejs/**/*.ejs"], { delay: 100 }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
