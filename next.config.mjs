import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Kita gunakan variabel import langsung, bukan string
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'dracula' // Tema Catppuccin juga ada lho kalau mau disamain sama terminal!
        }
      ]
    ]
  }
});

export default withMDX(nextConfig);
