import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export interface NavItem {
  id: string;
  title: string;
}

/**
 * In-page category nav with smooth scrolling and IntersectionObserver ScrollSpy.
 * Behaviour is ported 1:1 from the original main.js, but the active state lives
 * in a signal and is resumed rather than re-attached from scratch.
 */
export const TopNav = component$<{ items: NavItem[] }>(({ items }) => {
  const active = useSignal<string>("");
  /** While a click-driven smooth scroll is running, scroll-spy stays quiet. */
  const lockUntil = useSignal(0);

  useVisibleTask$(({ cleanup }) => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && sections.length) {
      observer = new IntersectionObserver(
        (entries) => {
          if (Date.now() < lockUntil.value) return;
          for (const entry of entries) {
            if (entry.isIntersecting) active.value = `#${entry.target.id}`;
          }
        },
        {
          rootMargin: "-15% 0px -75% 0px",
          threshold: 0,
        },
      );
      for (const section of sections) observer.observe(section);
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        const first = items[0];
        if (first) active.value = `#${first.id}`;
        return;
      }

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth" });
      active.value = hash;
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    cleanup(() => {
      observer?.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    });
  });

  return (
    <nav class="top-nav" aria-label="分类导航">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              class={active.value === `#${item.id}` ? "active" : undefined}
              onClick$={(event) => {
                event.preventDefault();

                const target = document.getElementById(item.id);
                if (!target) return;

                lockUntil.value = Date.now() + 700;
                active.value = `#${item.id}`;

                target.scrollIntoView({ behavior: "smooth" });

                const { protocol, host, pathname } = window.location;
                window.history.pushState(
                  { path: `${protocol}//${host}${pathname}#${item.id}` },
                  "",
                  `${protocol}//${host}${pathname}#${item.id}`,
                );
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});
