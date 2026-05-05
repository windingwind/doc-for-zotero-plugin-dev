<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{ code: string; id: string }>();

const container = ref<HTMLElement | null>(null);
const fullscreen = ref(false);
const { isDark } = useData();

// {{zotero:NAME}} → fixed-size background-image span pointing at /icons/zotero/(dark/)NAME.svg.
// Using <img> inside mermaid's foreignObject ignores the dimensions and renders huge;
// a span with explicit px size + background-image is reliable.
function expandIcons(src: string, dark: boolean): string {
  return src.replace(/\{\{zotero:([a-z0-9-]+)\}\}/gi, (_, name) => {
    const path = dark
      ? `/icons/zotero/dark/${name}.svg`
      : `/icons/zotero/${name}.svg`;
    const url = withBase(path);
    return `<span style='display:inline-block;width:16px;height:16px;background:url(${url}) center/contain no-repeat;vertical-align:-3px;margin-right:4px'></span>`;
  });
}

async function render() {
  if (!container.value) return;
  const decoded = expandIcons(decodeURIComponent(props.code), isDark.value);
  const mermaid = (await import("mermaid")).default;
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark.value ? "dark" : "default",
    securityLevel: "loose",
    flowchart: { htmlLabels: true },
  });
  try {
    const { svg } = await mermaid.render(`mermaid-svg-${props.id}`, decoded);
    container.value.innerHTML = svg;
  } catch (err) {
    container.value.innerHTML = `<pre style="color:#c00">${(err as Error).message}</pre>`;
  }
}

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value;
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && fullscreen.value) fullscreen.value = false;
}

onMounted(() => {
  render();
  window.addEventListener("keydown", onKey);
});
onUnmounted(() => window.removeEventListener("keydown", onKey));
watch(isDark, render);
</script>

<template>
  <div class="mermaid-wrapper" :class="{ 'is-fullscreen': fullscreen }">
    <div ref="container" class="mermaid-diagram" />
    <button
      class="mermaid-fs-btn"
      type="button"
      :title="fullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'"
      :aria-label="fullscreen ? 'Exit fullscreen' : 'Fullscreen'"
      @click="toggleFullscreen"
    >
      <svg
        v-if="!fullscreen"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M2 6V2H6 M14 6V2H10 M2 10V14H6 M14 10V14H10" />
      </svg>
      <svg
        v-else
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M6 2V6H2 M10 2V6H14 M6 14V10H2 M10 14V10H14" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.mermaid-wrapper {
  position: relative;
  margin: 1rem 0;
}
.mermaid-diagram {
  display: flex;
  justify-content: center;
  overflow-x: auto;
}
.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
.mermaid-fs-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 4px;
  background: var(--vp-c-bg-soft, #f6f6f7);
  color: var(--vp-c-text-2, #555);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.15s,
    background 0.15s;
}
.mermaid-wrapper:hover .mermaid-fs-btn,
.mermaid-fs-btn:focus-visible {
  opacity: 0.6;
  pointer-events: auto;
}
.mermaid-wrapper:hover .mermaid-fs-btn:hover {
  opacity: 1;
  background: var(--vp-c-bg-mute, #e6e6e8);
}

/* Fullscreen mode: the wrapper itself becomes the overlay */
.mermaid-wrapper.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  margin: 0;
  padding: 2rem;
  background: var(--vp-c-bg, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mermaid-wrapper.is-fullscreen .mermaid-diagram {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.mermaid-wrapper.is-fullscreen .mermaid-diagram :deep(svg) {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.mermaid-wrapper.is-fullscreen .mermaid-fs-btn {
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  opacity: 1;
  pointer-events: auto;
}
</style>
