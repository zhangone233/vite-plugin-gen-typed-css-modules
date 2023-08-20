# vite-plugin-gen-typed-css-modules

Generates typed definitions for css modules using [typed-css-modules](https://github.com/Quramy/typed-css-modules).

The plug-in will set the vite configuration field `css.modules.localsConvention` to [camelCaseOnly](https://github.com/madyankin/postcss-modules#localsconvention) and sets the [camelCase](https://github.com/Quramy/typed-css-modules#camelize-css-token) option in [typed-css-modules](https://github.com/Quramy/typed-css-modules).

Using the vite dev server watcher, any time a `[name].module.[css/scss/less]` file is edited a `[name].module.[css/scss/less].d.ts` file will be rewritten.

## Installation
```sh
npm install vite-plugin-gen-typed-css-modules
```

## Usage
```js
// vite.config.js
/** @type {import('vite').UserConfig} */

import typedGenCssModulesPlugin from "vite-plugin-gen-typed-css-modules";

export default defineConfig({
  plugins: [
    typedGenCssModulesPlugin({
      cssExt: 'scss', // default css
    })
  ],
});
```
