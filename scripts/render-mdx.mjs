/**
 * Standalone MDX renderer — runs OUTSIDE Next.js/Turbopack.
 * Called with: node scripts/render-mdx.mjs <srcPath> <htmlPath>
 * Compiles MDX → React component → static HTML, writes to <htmlPath>.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { compile, run } from "@mdx-js/mdx";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { fileURLToPath } from "url";

const [, , srcPath, htmlPath] = process.argv;
if (!srcPath || !htmlPath) {
  console.error("Usage: node scripts/render-mdx.mjs <srcPath> <htmlPath>");
  process.exit(1);
}

const raw = readFileSync(srcPath, "utf-8");
const stripped = raw.replace(/^---[\s\S]*?---\r?\n?/, "");
// remark-math only parses $$...$$ as display math when content is on its own line.
// Expand single-line $$content$$ to multiline so they get math-display class.
const body = stripped.replace(/^\$\$(.+?)\$\$$/gm, (_, inner) => `$$\n${inner}\n$$`);

// MDX components — emit semantic class names only. All visual styling lives in
// globals.css under `.prose-content` so it is reliably compiled and themable
// (Tailwind does not scan this script, so utility classes here would be dropped).
function Callout({ type = "info", children }) {
  const labels = { info: "Note", tip: "Tip", warning: "Warning", important: "Important", derivation: "Derivation" };
  const icons = { info: "i", tip: "✦", warning: "!", important: "★", derivation: "∑" };
  const t = labels[type] ? type : "info";
  return jsxs("div", {
    className: `pm-callout pm-callout-${t}`,
    children: [
      jsxs("p", {
        key: "label",
        className: "pm-callout-label",
        children: [
          jsx("span", { key: "ic", className: "pm-callout-icon", children: icons[t] }),
          jsx("span", { key: "tx", children: labels[t] }),
        ],
      }),
      jsx("div", { key: "body", className: "pm-callout-body", children }),
    ],
  });
}

function Formula({ children, label }) {
  return jsxs("div", {
    className: "pm-formula",
    children: [
      label ? jsx("span", { key: "label", className: "pm-formula-label", children: label }) : null,
      jsx("div", { key: "body", className: "pm-formula-body", children }),
    ],
  });
}

function Step({ n, children }) {
  return jsxs("div", {
    className: "pm-step",
    children: [
      jsx("span", { key: "num", className: "pm-step-num", children: n }),
      jsx("div", { key: "body", className: "pm-step-body", children }),
    ],
  });
}

function Diagram({ src, alt, caption }) {
  return jsxs("figure", {
    className: "pm-figure",
    children: [
      jsx("img", { key: "img", src, alt }),
      caption ? jsx("figcaption", { key: "caption", children: caption }) : null,
    ],
  });
}

// Only Callout/Formula/Step/Diagram and a table scroll-wrapper need custom output.
// Base elements (h1–h4, p, ul, table, code, …) are styled by `.prose-content` CSS.
const components = {
  Callout, Formula, Step, Diagram,
  table: ({ children, ...p }) =>
    jsx("div", { className: "pm-table-wrap", children: jsx("table", { ...p, children }) }),
};

const vfile = await compile(body, {
  outputFormat: "function-body",
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [],
  development: false,
});

const mod = await run(String(vfile), { Fragment, jsx, jsxs, baseUrl: import.meta.url });
const Content = mod.default;
const html = renderToStaticMarkup(jsx(Content, { components }));

// Strip <link rel="preload"> hints React 19 emits for <img> — they're useless in body HTML
const cleanHtml = html.replace(/<link rel="preload"[^>]*\/>/g, "");

mkdirSync(path.dirname(htmlPath), { recursive: true });
writeFileSync(htmlPath, cleanHtml, "utf-8");
console.log(`Rendered ${cleanHtml.length} chars → ${htmlPath}`);
