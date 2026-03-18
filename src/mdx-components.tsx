import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Mengubah # Heading 1 menjadi gaya terminal dengan warna Cyan
        h1: ({ children }) => (
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-6 border-b border-cyan-800 pb-2">
                # {children}
            </h1>
        ),
        // Mengubah ## Heading 2
        h2: ({ children }) => (
            <h2 className="text-xl md:text-2xl font-bold text-cyan-300 mt-8 mb-4">
                ## {children}
            </h2>
        ),
        // Mempercantik paragraf biasa dengan warna slate (abu-abu kebiruan)
        p: ({ children }) => <p className="mb-4 text-slate-300">{children}</p>,
        // Mengubah tautan agar konsisten dengan warna Cyan
        a: ({ href, children }) => (
            <Link href={href as string} className="text-cyan-400 hover:underline hover:text-cyan-300">
                {children}
            </Link>
        ),
        // Mengubah > Blockquote dengan aksen biru tua agar tidak monoton
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 bg-blue-950/20 pl-4 py-2 my-4 text-blue-200 italic">
                {children}
            </blockquote>
        ),
        // `pre` untuk blok kode dengan border yang selaras dengan tema "Window"
        pre: ({ children }) => (
            <pre className="p-4 rounded-lg overflow-x-auto my-6 border border-cyan-900/50 text-sm font-mono shadow-xl bg-[#0b0e14]">
                {children}
            </pre>
        ),
        // `code` (inline code) menggunakan background cyan gelap
        code: ({ className, children }) => {
            const isInline = !className;
            return (
                <code className={isInline ? "bg-cyan-950/70 text-cyan-200 px-1.5 py-0.5 rounded text-sm font-mono" : className}>
                    {children}
                </code>
            );
        },

        // --- STYLING UNTUK TABEL GFM ---
        table: ({ children }) => (
            <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse border border-cyan-900/50">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => (
            <thead className="bg-cyan-950/30 text-cyan-400">
                {children}
            </thead>
        ),
        th: ({ children }) => (
            <th className="border border-cyan-900/50 px-4 py-3 font-bold">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="border border-cyan-900/50 px-4 py-2 text-slate-300">
                {children}
            </td>
        ),
        ...components,
    };
}