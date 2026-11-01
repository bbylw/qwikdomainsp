import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";
import { SITE_URL } from "../../src/constants";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      staticAdapter({
        // CI passes the real deployment origin; SITE_URL is the local fallback.
        origin: process.env.PUBLIC_SITE_ORIGIN || SITE_URL,
      }),
    ],
  };
});
