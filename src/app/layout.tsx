import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import PromptHeader from "./PromptHeader";
import "./globals.css";
import MusicPlayer from "./MusicPlayer";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Terminal Garden",
  description: "Buku catatan digital interaktif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} font-mono antialiased min-h-screen flex items-center justify-center p-4 md:p-8`}
      >
        {/* Efek Window Tiling ala Hyprland */}
        <div className="w-full max-w-4xl bg-[#0f141e] border border-cyan-900/50 rounded-lg shadow-2xl shadow-cyan-900/20 p-6 md:p-12 relative overflow-hidden">
          
          {/* Aksen tombol kontrol window di pojok kanan atas (Estetika) */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-700"></div>
          </div>

          <PromptHeader />

          <main className="leading-relaxed">
            {children}
          </main>
          <MusicPlayer />
        </div>
      </body>
    </html>
  );
}