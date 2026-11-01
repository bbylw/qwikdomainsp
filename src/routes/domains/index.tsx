import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import { LinkCard } from "~/components/link-card";
import linksData from "~/data/links.json";

const TITLE = "免费域名 / DNS托管 - WebNav Hub";
const DESCRIPTION = "WebNav Hub 精选免费域名注册、DNS 解析托管、廉价域名注册商与 DNS 查询工具导航。";

export default component$(() => {
  return (
    <main id="app-main" data-page="domains">
      <section id="domains" aria-label="免费域名与 DNS 托管">
        <div class="link-grid" id="domains-grid">
          {linksData.domains.map((item) => (
            <LinkCard key={item.url} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: TITLE,
  meta: [
    { name: "description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: "精选免费域名注册、DNS 解析托管、廉价域名注册商与 DNS 查询工具导航。" },
  ],
};
