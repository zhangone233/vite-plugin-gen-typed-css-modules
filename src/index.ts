import fs from "fs";
import type { Plugin, UserConfig } from "vite";
import { DtsCreator } from "typed-css-modules/lib/dts-creator.js";

interface PluginOptions {
  debug?: boolean;
  cssExt?: string;
}
function plugin(options?: PluginOptions): Plugin {
  const { debug = false, cssExt = "css" } = options ?? {};
  const creator = new DtsCreator({
    camelCase: true,
  });

  return {
    name: "typed-css-modules",
    config: () => {
      const config: UserConfig = {
        css: {
          modules: {
            localsConvention: "camelCaseOnly",
          },
        },
      };
      return config;
    },
    configureServer: (server) => {
      server.watcher.on("change", async (path) => {
        if (!path.endsWith(`.module.${cssExt}`)) return;
        try {
          const fileContent = await creator.create(path, undefined, true);
          await fileContent.writeFile();
        } catch (err) {
          if (debug) {
            console.warn(JSON.stringify(err));
          }
          /* ignore */
        }
      });

      server.watcher.on("unlink", (path) => {
        if (!path.endsWith(`.module.${cssExt}`)) return;
        try {
          fs.unlinkSync(path + ".d.ts");
        } catch (err) {
          if (debug) {
            console.warn(JSON.stringify(err));
          }
          /* ignore */
        }
      });
    },
  };
}

export default plugin;
