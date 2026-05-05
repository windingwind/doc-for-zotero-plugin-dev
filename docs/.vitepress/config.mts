import { defineConfig } from "vitepress";

const SITE_BASE = "/doc-for-zotero-plugin-dev/";
const SITE_HOSTNAME = "https://windingwind.github.io";
const SITE_URL = `${SITE_HOSTNAME}${SITE_BASE}`;
const SITE_TITLE = "Dev Docs for Zotero Plugin";
const SITE_DESCRIPTION =
  "Comprehensive developer documentation for building Zotero plugins: getting started guides, core concepts, best practices, and API reference for the Zotero 7+ plugin system.";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: SITE_TITLE,
  titleTemplate: ":title | Dev Docs for Zotero Plugin",
  description: SITE_DESCRIPTION,
  base: SITE_BASE,
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  sitemap: {
    hostname: SITE_URL,
  },
  head: [
    ["link", { rel: "icon", href: `${SITE_BASE}favicon.ico` }],
    ["meta", { name: "theme-color", content: "#3c8772" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Zotero, Zotero plugin, Zotero plugin development, Zotero 7, Zotero API, Zotero extension, plugin developer documentation, Zotero plugin tutorial, Zotero plugin SDK",
      },
    ],
    ["meta", { name: "author", content: "windingwind" }],
    ["meta", { name: "robots", content: "index, follow" }],
    // Open Graph
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: SITE_TITLE }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:title", content: SITE_TITLE }],
    ["meta", { property: "og:description", content: SITE_DESCRIPTION }],
    ["meta", { property: "og:url", content: SITE_URL }],
    ["meta", { property: "og:image", content: `${SITE_URL}og-image.png` }],
    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: SITE_TITLE }],
    ["meta", { name: "twitter:description", content: SITE_DESCRIPTION }],
    ["meta", { name: "twitter:image", content: `${SITE_URL}og-image.png` }],
  ],
  transformPageData(pageData) {
    const canonicalPath = pageData.relativePath
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const pageTitle = pageData.title || pageData.frontmatter.title;
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      SITE_DESCRIPTION;

    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ["link", { rel: "canonical", href: canonicalUrl }],
      ["meta", { property: "og:url", content: canonicalUrl }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { name: "twitter:description", content: description }],
    );
    if (pageTitle) {
      pageData.frontmatter.head.push(
        ["meta", { property: "og:title", content: pageTitle }],
        ["meta", { name: "twitter:title", content: pageTitle }],
      );
    }
  },
  markdown: {
    config(md) {
      const defaultFence = md.renderer.rules.fence!;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (token.info.trim() === "mermaid") {
          const id = `${env.path || ""}-${idx}`.replace(/[^a-z0-9]/gi, "-");
          const code = encodeURIComponent(token.content);
          return `<Mermaid id="${id}" code="${code}" />`;
        }
        return defaultFence(tokens, idx, options, env, self);
      };
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/main/" },
      { text: "APIs", link: "/api/" },
      { text: "Tools", link: "/tools/" },
    ],

    sidebar: {
      "/main/": [
        {
          text: "Getting Started",
          collapsed: false,
          items: [
            {
              text: "What is Zotero Plugin",
              link: "/main/what-is-zotero-plugin",
            },
            { text: "Prerequisites", link: "/main/prerequisites" },
            {
              text: "Your First Plugin",
              link: "/main/your-first-zotero-plugin",
            },
            {
              text: "Plugin Anatomy",
              collapsed: false,
              items: [
                {
                  text: "Plugin File Structure",
                  link: "/main/plugin-file-structure",
                },
                {
                  text: "Plugin Update",
                  link: "/main/plugin-update",
                },
              ],
            },
          ],
        },
        {
          text: "Concepts",
          collapsed: false,
          items: [
            {
              text: "Plugin Lifecycle",
              link: "/main/plugin-lifecycle",
            },
            {
              text: "Zotero Data Model",
              link: "/main/zotero-data-model",
            },
            {
              text: "Preferences",
              link: "/main/preferences",
            },
            {
              text: "Notification System",
              link: "/main/notification-system",
            },
            {
              text: "Privileged vs Unprivileged",
              link: "/main/privileged-vs-unprivileged",
            },
            {
              text: "Resource Registry",
              link: "/main/resource-registry",
            },
          ],
        },
        {
          text: "Best Practices",
          collapsed: false,
          items: [
            {
              text: "Item Tree Custom Column",
              link: "/main/custom-column-item-tree",
            },
            {
              text: "Item Pane Custom Section",
              link: "/main/custom-section-item-pane",
            },
            {
              text: "Item Pane Info Custom Row",
              link: "/main/custom-row-item-pane-info",
            },
            {
              text: "Preferences Pane",
              link: "/main/preferences-pane",
            },
            {
              text: "Menu",
              link: "/main/menu",
            },
            {
              text: "Reader UI Injection",
              link: "/main/reader-ui-injection",
            },
            {
              text: "HTTP Request",
              link: "/main/http-request",
            },
            {
              text: "File I/O",
              link: "/main/file-io",
            },
            {
              text: "Web Worker",
              link: "/main/web-worker",
            },
            {
              text: "Item Operations",
              link: "/main/item-operations",
            },
            {
              text: "Collection Operations",
              link: "/main/collection-operations",
            },
            {
              text: "Search Operations",
              link: "/main/search-operations",
            },
            {
              text: "ZoteroPane",
              link: "/main/zotero-pane",
            },
            {
              text: "Shutdown",
              link: "/main/shutdown",
            },
          ],
        },
      ],

      "/api/": [
        {
          text: "Reader",
          link: "/api/reader",
        },
        {
          text: "Preference Panes",
          link: "/api/preferencePanes",
        },
        {
          text: "Item Pane Manager",
          link: "/api/itemPaneManager",
        },
        {
          text: "Item Tree Manager",
          link: "/api/itemTreeManager",
        },
        {
          text: "Menu Manager",
          link: "/api/menuManager",
        },
      ],
      "/tools/": [
        {
          text: "Start Point",
          link: "/tools/start-point",
        },
        {
          text: "Dependencies & SDKs",
          link: "/tools/dependencies",
        },
        {
          text: "CLI Tools",
          link: "/tools/cli",
        },
        {
          text: "Other Resources",
          link: "/tools/resources",
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/windingwind/doc-for-zotero-plugin-dev",
      },
    ],

    search: {
      provider: "local",
    },
  },
});
