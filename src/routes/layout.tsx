import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { SITE_NAME } from "~/constants";

export default component$(() => {
  const loc = useLocation();
  const isHome = loc.url.pathname === "/" || loc.url.pathname === import.meta.env.BASE_URL;

  // Rendered as the build year on the server, corrected to the client year on resume.
  const year = useSignal(new Date().getFullYear());
  useVisibleTask$(() => {
    year.value = new Date().getFullYear();
  });

  return (
    <>
      <header>
        <h1>{isHome ? SITE_NAME : <a href={import.meta.env.BASE_URL}>{SITE_NAME}</a>}</h1>
      </header>

      <Slot />

      <footer>
        <p>
          © <span id="year">{year.value}</span> {SITE_NAME}. 保留所有权利。
        </p>
        <nav aria-label="页脚导航">
          <a href="#" onClick$={(event) => event.preventDefault()}>
            隐私政策
          </a>
          <a href="#" onClick$={(event) => event.preventDefault()}>
            使用条款
          </a>
          <a href="#" onClick$={(event) => event.preventDefault()}>
            联系我们
          </a>
        </nav>
      </footer>
    </>
  );
});
