import { component$, useStyles$ } from "@qwik.dev/core";
import { RouterOutlet, useQwikRouter } from "@qwik.dev/router";
import { RouterHead } from "./components/router-head/router-head";
import globalStyles from "./global.css?inline";

export default component$(() => {
  useQwikRouter();
  useStyles$(globalStyles);

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <RouterHead />
      </head>
      <body lang="zh-CN">
        <RouterOutlet />
      </body>
    </>
  );
});
