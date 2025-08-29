"use client";

import { MDXProvider } from "@mdx-js/react";

const components = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold my-6" {...p} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-zinc-900/90 px-1 py-0.5" {...p} />
  ),
};

export default function MdxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
