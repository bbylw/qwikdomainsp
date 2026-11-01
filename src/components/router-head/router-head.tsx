import { component$ } from "@qwik.dev/core";
import { useDocumentHead, useLocation } from "@qwik.dev/router";

/**
 * Head manager — mirrors the <head> of the original static pages
 * (SEO / Open Graph metadata, favicon, FontAwesome CDN, preconnect).
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  // "/" locally, "/<repo>/" when deployed as a GitHub Pages project site.
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <title>{head.title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0d0d0d" />
      <link rel="canonical" href={loc.url.href} />
      <link rel="icon" type="image/svg+xml" href={`${base}favicon.svg`} />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.3.0/css/all.min.css"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {head.meta.map((m) => (
        <meta key={m.key} name={m.name} property={m.property} content={m.content} />
      ))}

      <meta property="og:url" content={loc.url.href} />
      <meta property="og:image" content={`${loc.url.origin}${base}favicon.svg`} />

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
