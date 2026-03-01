"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Kita menerima daftar slug (nama folder) dari Server Component agar input tahu direktori apa saja yang valid
export default function TerminalInput({ availableRoutes }: { availableRoutes: string[] }) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ cmd: string; response: string }[]>([]);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Otomatis fokus ke input saat halaman diklik dimana saja
    useEffect(() => {
        const handleClick = () => inputRef.current?.focus();
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = input.trim();
            setInput("");

            if (!cmd) return;

            const args = cmd.split(" ");
            const mainCmd = args[0].toLowerCase();
            let response = "";

            // Logika perintah terminal
            if (mainCmd === "cd") {
                const target = args[1];
                if (!target) {
                    response = "cd: missing argument";
                } else if (target === "..") {
                    response = "ridaz@greatest:~/garden$ Already at root directory";
                } else if (availableRoutes.includes(target.replace('/', ''))) {
                    // Jika folder ada, lakukan navigasi pindah halaman!
                    router.push(`/${target.replace('/', '')}`);
                    return;
                } else {
                    response = `cd: ${target}: No such file or directory`;
                }
            } else if (mainCmd === "ls") {
                response = availableRoutes.join("  ") + "  README.md";
            } else if (mainCmd === "clear") {
                setHistory([]);
                return;
            } else if (mainCmd === "help") {
                response = "Available commands: cd <dir>, ls, clear, help";
            } else if (mainCmd === "sudo") {
                response = "ridaz is not in the sudoers file. This incident will be reported.";
            } else {
                response = `Command not found: ${mainCmd}. Type 'help' to see available commands.`;
            }

            // Simpan riwayat perintah untuk ditampilkan di layar
            setHistory((prev) => [...prev, { cmd, response }]);
        }
    };

    return (
        <div className="mt-8">
            {/* Tampilkan riwayat perintah yang diketik sebelumnya */}
            {history.map((item, index) => (
                <div key={index} className="mb-2">
                    <p>
                        <span className="text-blue-400">ridaz@greatest</span>:
                        <span className="text-purple-400">~/garden</span>$ {item.cmd}
                    </p>
                    {item.response && <p className="text-gray-400 whitespace-pre-wrap">{item.response}</p>}
                </div>
            ))}

            {/* Baris Input Aktif */}
            <div className="flex items-center gap-2">
                <p className="shrink-0">
                    <span className="text-blue-400">ridaz@greatest</span>:
                    <span className="text-purple-400">~/garden</span>$
                </p>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none text-green-400 font-mono caret-green-400"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}