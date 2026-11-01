import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@qwik.dev/core/optimizer";
import { qwikRouter } from "@qwik.dev/router/vite";

/**
 * GitHub Pages serves project sites from `/<repo>/`, so the production build can
 * be nested under a base path via `PUBLIC_BASE_PATH` (CI sets it from the repo name).
 * Dev always runs at `/`.
 *
 * TS path aliases (`~/*`) are resolved by Vite 8's native `resolve.tsconfigPaths`.
 */
export default defineConfig(({ command }): UserConfig => {
  const basePath = process.env.PUBLIC_BASE_PATH || "/";

  return {
    base: command === "build" ? basePath : "/",
    plugins: [qwikRouter(), qwikVite()],
    resolve: {
      tsconfigPaths: true,
    },
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
