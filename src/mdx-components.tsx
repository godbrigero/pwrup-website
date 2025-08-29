import type { MDXComponents } from "mdx/types";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: (props) => <p className="text-white" {...props} />,
    h1: (props) => (
      <h1 className="text-4xl font-bold my-6 text-white" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-2xl font-semibold my-6 text-white" {...props} />
    ),
    code: (props) => (
      <code
        className="rounded bg-zinc-900/90 px-1 py-0.5 text-white"
        {...props}
      />
    ),
    ...components,
  };
}
