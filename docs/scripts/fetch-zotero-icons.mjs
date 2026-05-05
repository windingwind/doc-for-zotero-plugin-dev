import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const REPO = "zotero/zotero";
const REF = process.env.ZOTERO_ICON_REF || "main";

// Icons referenced as {{zotero:NAME}} in markdown / mermaid blocks.
//   kind: "item-type"  → has light + dark variants under chrome/skin/default/zotero/item-type/16/{variant}/
//   kind: "universal"  → single variant under chrome/skin/default/zotero/16/universal/
//                        These use fill="context-fill" (Firefox chrome-only); we substitute a
//                        real color per theme during post-process so they render in plain browsers.
// Add new entries here when the docs need a new icon.
const ICONS = [
  { name: "book", kind: "item-type" },
  { name: "attachment-pdf", kind: "item-type" },
  { name: "note", kind: "item-type" },
  { name: "annotate-highlight", kind: "universal" },
  { name: "annotate-note", kind: "universal" },
  { name: "library", kind: "universal" },
  { name: "folder", kind: "universal" },
];

// Replacement colors for `context-fill` / `context-stroke` per theme.
const LIGHT_FILL = "#444";
const DARK_FILL = "#ccc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/icons/zotero");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function urlFor({ name, kind }, variant) {
  if (kind === "item-type") {
    return `https://raw.githubusercontent.com/${REPO}/${REF}/chrome/skin/default/zotero/item-type/16/${variant}/${name}.svg`;
  }
  return `https://raw.githubusercontent.com/${REPO}/${REF}/chrome/skin/default/zotero/16/universal/${name}.svg`;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

function recolorContextFill(svg, color) {
  return svg
    .replace(/="context-fill"/g, `="${color}"`)
    .replace(/="context-stroke"/g, `="${color}"`);
}

async function writeIfMissing(out, body, label) {
  if (await exists(out)) {
    console.log(`skip ${label} (already cached)`);
    return;
  }
  await writeFile(out, body);
  console.log(`fetched ${label}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(resolve(OUT_DIR, "dark"), { recursive: true });

  for (const icon of ICONS) {
    const lightOut = resolve(OUT_DIR, `${icon.name}.svg`);
    const darkOut = resolve(OUT_DIR, `dark/${icon.name}.svg`);

    if (icon.kind === "item-type") {
      const light = await fetchText(urlFor(icon, "light"));
      const dark = await fetchText(urlFor(icon, "dark"));
      await writeIfMissing(lightOut, light, `light/${icon.name}.svg`);
      await writeIfMissing(darkOut, dark, `dark/${icon.name}.svg`);
    } else {
      const svg = await fetchText(urlFor(icon));
      await writeIfMissing(
        lightOut,
        recolorContextFill(svg, LIGHT_FILL),
        `${icon.name}.svg (universal, ${LIGHT_FILL})`,
      );
      await writeIfMissing(
        darkOut,
        recolorContextFill(svg, DARK_FILL),
        `dark/${icon.name}.svg (universal, ${DARK_FILL})`,
      );
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
