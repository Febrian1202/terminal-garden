import type { NextConfig } from "next";
import createMDX from "@next/mdx";
// import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {

    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
    // Menambahkan plugin rehype
    rehypePlugins: [
      [
        'rehype-pretty-code',
        {
          // Konfigurasi rehype-pretty-code`
          theme: 'dracula'
        }
      ]
    ]
  }
});

export default withMDX(nextConfig);
