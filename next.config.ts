import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // optional: add remark/rehype plugins here
  // options: { remarkPlugins: [], rehypePlugins: [] }
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
