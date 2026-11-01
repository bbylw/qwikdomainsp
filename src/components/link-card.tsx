import { component$ } from "@builder.io/qwik";

export interface LinkItem {
  title: string;
  url: string;
  icon: string;
  internal?: boolean;
}

/** "/" locally, "/<repo>/" when deployed as a GitHub Pages project site. */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Semantic card: `<a class="link-card">` with an icon and a two-line title.
 * External links open in a new tab with `rel="noopener noreferrer"`.
 */
export const LinkCard = component$<{ item: LinkItem }>(({ item }) => {
  const href = item.internal && item.url.startsWith("/") ? `${base}${item.url}` : item.url;

  return (
    <a
      class="link-card"
      href={href}
      target={item.internal ? undefined : "_blank"}
      rel={item.internal ? undefined : "noopener noreferrer"}
    >
      <i class={item.icon} aria-hidden="true" />
      <h3>{item.title}</h3>
    </a>
  );
});
