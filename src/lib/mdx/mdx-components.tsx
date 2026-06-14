import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

// Callout box for notes, tips, warnings
function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "tip" | "warning" | "important" | "derivation";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
    tip: "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-300",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300",
    important: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300",
    derivation: "border-purple-500/30 bg-purple-500/5 text-purple-700 dark:text-purple-300",
  };

  const labels = {
    info: "Note",
    tip: "Tip",
    warning: "Warning",
    important: "Important",
    derivation: "Derivation",
  };

  return (
    <div className={cn("my-4 rounded-lg border px-4 py-3", styles[type])}>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide opacity-70">
        {labels[type]}
      </p>
      <div>{children}</div>
    </div>
  );
}

// Formula highlight
function Formula({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="my-6 rounded-xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-800 dark:bg-brand-950/20">
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          {label}
        </p>
      )}
      <div className="overflow-x-auto text-center text-lg">{children}</div>
    </div>
  );
}

// Step in a derivation
function Step({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <div className="my-3 flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
        {n}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// Physics diagram placeholder
function Diagram({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-6 text-center">
      <img
        src={src}
        alt={alt}
        className="mx-auto max-h-80 rounded-lg border"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  // Custom components
  Callout,
  Formula,
  Step,
  Diagram,

  // Override HTML elements
  h1: ({ children, ...props }) => (
    <h1
      className="mb-4 mt-8 scroll-m-20 text-3xl font-bold tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-3 mt-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mb-2 mt-5 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 [&>li]:mt-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 [&>li]:mt-1" {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 border-l-4 border-brand-400 pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  ),
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border bg-muted px-3 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border px-3 py-2" {...props}>
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-6 border-border" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
};
