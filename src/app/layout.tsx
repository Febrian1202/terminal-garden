import type { Metadata } from "next";
import { Fira_Code } from "next/font/google"; // Menggunakan Fira Code
import "./globals.css";
import PromptHeader from "./PromptHeader";

// Konfigurasi Fira Code
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
        className={`${firaCode.variable} font-mono antialiased p-6 md:p-12 max-w-4xl mx-auto`}
      >
        {/* Header Prompt Terminal Global */}
        <PromptHeader />

        {/* Kontek halaman */}
        <main className="leading-relaxed">
          {children}
        </main>
      </body>
    </html>
  );
}