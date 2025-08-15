import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dev Docs for Zotero Plugin",
  description: "Documents for Zotero Plugin Developers",
  base: "/doc-for-zotero-plugin-dev/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/main/" },
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
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
