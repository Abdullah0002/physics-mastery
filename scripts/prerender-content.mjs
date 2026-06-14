/**
 * Pre-renders every chapter MDX file to static HTML before `next build`/`next dev`.
 *
 * Runs OUTSIDE Next.js/Turbopack (a plain Node script), so it can use the ESM
 * MDX toolchain and spawn freely. Output goes to content/.rendered/<slug>__<file>.html
 * and is read at build time by src/lib/mdx/mdx-utils.tsx (no runtime compilation,
 * no child processes in the server bundle — required for Vercel).
 *
 *   node scripts/prerender-content.mjs
 */
import { readdirSync, statSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { spawnSync } from "child_process";

const root = process.cwd();
const chaptersDir = path.join(root, "content", "chapters");
const outDir = path.join(root, "content", ".rendered");
const renderScript = path.join(root, "scripts", "render-mdx.mjs");

if (!existsSync(chaptersDir)) {
  console.error(`No chapters directory at ${chaptersDir}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

let ok = 0;
let failed = 0;
const failures = [];

for (const slug of readdirSync(chaptersDir)) {
  const chapterPath = path.join(chaptersDir, slug);
  if (!statSync(chapterPath).isDirectory()) continue;

  for (const f of readdirSync(chapterPath)) {
    if (!f.endsWith(".mdx")) continue;
    const src = path.join(chapterPath, f);
    const name = f.replace(/\.mdx$/, "");
    const out = path.join(outDir, `${slug}__${name}.html`);

    const res = spawnSync("node", [renderScript, src, out], {
      encoding: "utf-8",
      timeout: 120_000,
    });

    if (res.status === 0) {
      ok++;
    } else {
      failed++;
      failures.push(`${slug}/${f}: ${(res.stderr || res.stdout || "unknown error").trim()}`);
    }
  }
}

console.log(`Pre-rendered ${ok} chapter file(s) → content/.rendered/${failed ? ` (${failed} failed)` : ""}`);
if (failed > 0) {
  console.error("\nFailures:\n" + failures.join("\n"));
  process.exit(1);
}
