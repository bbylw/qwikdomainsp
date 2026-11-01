import { getClientManifest } from "@qwik.dev/core";
import { renderToStream, type RenderToStreamOptions } from "@qwik.dev/core/server";
import Root from "./root";

/**
 * SSR entry point used by the Qwik Router middleware and the SSG adapter.
 */
export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest: getClientManifest(),
    ...opts,
    containerAttributes: {
      lang: "zh-CN",
      ...opts.containerAttributes,
    },
  });
}
