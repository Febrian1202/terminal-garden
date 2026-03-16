import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Mengubah # Heading 1 menjadi gaya terminal
        h1: ({ children }) => (
            <h1 className="text-2xl md:text-3xl font-bold text-green-300 mb-6 border-b border-green-800 pb-2">
                # {children}
            </h1>
        ),
        // Mengubah ## Heading 2
        h2: ({ children }) => (
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mt-8 mb-4">
                ## {children}
            </h2>
        ),
        // Mempercantik paragraf biasa
        p: ({ children }) => <p className="mb-4 text-gray-300">{children}</p>,
        // Mengubah tautan agar menggunakan komponen <Link> Next.js
        a: ({ href, children }) => (
            <Link href={href as string} className="text-blue-400 hover:underline hover:text-blue-300">
                {children}
            </Link>
        ),
        // Mengubah > Blockquote
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-500 bg-purple-950/20 pl-4 py-2 my-4 text-purple-200 italic">
                {children}
            </blockquote>
        ),
        // `pre` digunakan untuk membungkus blok kode utuh
        pre: ({ children }) => (
            <pre className="p-4 rounded-lg overflow-x-auto my-6 border border-gray-800 text-sm font-mono shadow-xl">
                {children}
            </pre>
        ),
        // `code` menggunakan logika: inline code vs blok kode
        code: ({ className, children }) => {
            const isInline = !className;
            return (
                <code className={isInline ? "bg-green-950 text-green-200 px-1.5 py-0.5 rounded text-sm font-mono" : className}>
                    {children}
                </code>
            );
        },

        // --- STYLING UNTUK TABEL GFM ---
        table: ({ children }) => (
            <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse border border-green-900/50">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => (
            <thead className="bg-green-950/50 text-green-400">
                {children}
            </thead>
        ),
        th: ({ children }) => (
            <th className="border border-green-900/50 px-4 py-3 font-bold">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="border border-green-900/50 px-4 py-2 text-gray-300">
                {children}
            </td>
        ),
        ...components,
    };
}