import BabelPlugin from "@rollup/plugin-babel";
import TypeScriptPlugin from "@rollup/plugin-typescript";
// import ResolvePlugin from '@rollup/plugin-node-resolve';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "esm", // 指定输出产物文件的类型
    sourcemap: true,
  },
  plugins: [
    // ResolvePlugin(),
    TypeScriptPlugin({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
    }),
    BabelPlugin({
      babelHelpers: "bundled",
      exclude: 'node_modules/**'
    }),
  ],
  external: ["fs", "typed-css-modules/lib/dts-creator.js"],
};

export default config;
