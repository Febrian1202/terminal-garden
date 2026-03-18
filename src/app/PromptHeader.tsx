"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function PromptHeader() {
    const pathname = usePathname();
    const currentDir = pathname === "/" ? "" : pathname.replace("/", "");

    return (
        <header className="mb-8 border-b border-cyan-900/50 pb-4 flex flex-col md:flex-row md:justify-between md:items-end gap-2 mt-4 md:mt-0">
            <p className="text-sm md:text-base">
                <span className="text-cyan-300">ridaz@fedora</span>:
                <span className="text-blue-400">
                    ~/garden{currentDir ? `/${currentDir}` : ""}
                </span>
                ${" "}
                <span className="animate-pulse font-bold text-cyan-400">_</span>
            </p>

            {pathname !== "/" && (
                <Link
                    href="/"
                    className="text-slate-500 hover:text-cyan-400 hover:underline text-sm font-bold transition-colors"
                >
                    $ cd ..
                </Link>
            )}
        </header>
    )
}