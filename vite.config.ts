import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * GitHub Pages serves project sites from `/<repo>/`, so the production build can
 * be nested under a base path via `PUBLIC_BASE_PATH` (CI sets it from the repo name).
 * Dev always runs at `/`.
 */
export default defineConfig(({ command }): UserConfig => {
  const basePath = process.env.PUBLIC_BASE_PATH || "/";

  return {
    base: command === "build" ? basePath : "/",
    plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: "." })],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
