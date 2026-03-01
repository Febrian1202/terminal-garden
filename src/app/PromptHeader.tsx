"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function PromptHeader() {
    const pathname = usePathname();

    // Menghapus tanda slash di awal rute
    // Jika sedang ada di homepage ("/"), currentDir akan kosong
    const currentDir = pathname === "/" ? "" : pathname.replace("/", "");

    return (
        <header className="mb-8 border-b border-green-900/50 pb-4 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
            <p className="text-sm md:text-base">
                <span className="text-blue-400">ridaz@greatest</span>:
                <span className="text-purple-400">
                    ~/garden{currentDir ? `/${currentDir}` : ""}
                </span>
                ${" "}
                <span className="animate-pulse font-bold">_</span>
            </p>

            {/* Tombol kembali (cd..) Hanya muncul jika kita tidak sedang berada di Homepage */}
            {pathname !== "/" && (
                <Link
                    href="/"
                    className="text-gray-500 hover:text-green-400 hover:underline text-sm font-bold transition-colors"
                >
                    $ cd ..
                </Link>
            )}
        </header>
    )
}