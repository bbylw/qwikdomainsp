import { ssgAdapter } from "@qwik.dev/router/adapters/ssg/vite";
import { extendConfig } from "@qwik.dev/router/vite";
import baseConfig from "../../vite.config";
import { SITE_URL } from "../../src/constants";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-router-config"],
      },
    },
    plugins: [
      ssgAdapter({
        // CI passes the real deployment origin; SITE_URL is the local fallback.
        origin: process.env.PUBLIC_SITE_ORIGIN || SITE_URL,
      }),
    ],
  };
});
