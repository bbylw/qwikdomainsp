import { createQwikRouter } from "@qwik.dev/router/middleware/node";
import render from "./entry.ssr";

/**
 * Preview server entry point (`vite preview` against an SSR build).
 * Qwik Router 2 reads its route config from the build-time `@qwik-router-config`
 * module, so only the render function is passed in.
 */
export default createQwikRouter({ render });
