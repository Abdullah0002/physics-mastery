"use client";

/**
 * Renders trusted inline SVG markup (authored in this module's JSON, not user input).
 * The wrapper makes the SVG fully responsive and theme-aware (SVGs use currentColor).
 */
export function SvgFigure({
  svg,
  className = "",
  label,
}: {
  svg: string;
  className?: string;
  label?: string;
}) {
  if (!svg) return null;
  return (
    <figure
      className={`mx-auto w-full max-w-md text-slate-700 dark:text-slate-200 [&_svg]:h-auto [&_svg]:w-full ${className}`}
      // SVGs are static, author-controlled assets bundled with the module.
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-label={label}
    />
  );
}
