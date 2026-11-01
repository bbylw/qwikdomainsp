import { render, type RenderOptions } from "@builder.io/qwik";
import Root from "./root";

/**
 * Development entry point — resumable client-side rendering for `vite --mode ssr`.
 */
export default function (opts: RenderOptions) {
  return render(document, <Root />, opts);
}
