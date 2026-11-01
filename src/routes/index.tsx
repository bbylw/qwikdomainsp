import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import { LinkCard } from "~/components/link-card";
import { TopNav } from "~/components/top-nav";
import linksData from "~/data/links.json";

const TITLE = "WebNav Hub - 精选 AI 搜索、开发者工具与云服务导航";
const DESCRIPTION =
  "WebNav Hub 收录 160+ 精选 AI 搜索、大模型工具、托管社交、实用开发者工具、科技资讯、云存储与电子邮箱导航。";

export default component$(() => {
  return (
    <>
      <TopNav items={linksData.categories.map((category) => ({ id: category.id, title: category.title }))} />

      <main id="app-main" data-page="home">
        {linksData.categories.map((category) => (
          <section key={category.id} id={category.id}>
            <h2 class="category-title">{category.title}</h2>
            <div class="link-grid">
              {category.links.map((item) => (
                <LinkCard key={item.url} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: TITLE,
  meta: [
    { name: "description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
  ],
};
