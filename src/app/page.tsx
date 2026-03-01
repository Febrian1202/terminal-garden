import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import TerminalInput from "./TerminalInput";

// Fungsi untuk membaca semua folder catatan di dalam src/app
function getNotes() {
  const appDir = path.join(process.cwd(), "src/app");
  const folders = fs.readdirSync(appDir, { withFileTypes: true });

  const notes = [];

  for (const dirent of folders) {

    // Kita hanya peduli pada folder, abaikan file seperti layout.tsx dll
    if (!dirent.isDirectory()) continue;

    const folderName = dirent.name;
    const mdxPath = path.join(appDir, folderName, "page.mdx");

    // Jika di dalam folder ada file page.mdx, proses datanya!
    if (fs.existsSync(mdxPath)) {
      const fileContent = fs.readFileSync(mdxPath, "utf-8");

      // gray-matter memisahkan blok YAML (data) dari konten MDX
      const { data } = matter(fileContent);
      const stats = fs.statSync(mdxPath);

      // Hitung waktu membaca berdasarkan jumlah kata
      data.readingTime = readingTime(fileContent).text;

      notes.push({
        slug: folderName,
        title: data.title || folderName,
        date: data.date || "Unknown",
        size: stats.size,
        readingTime: data.readingTime,
      })
    }
  }

  return notes;
}

export default function Home() {
  const notes = getNotes();

  // Ekstrak hanya nama slug-nya untuk dikirim ke komponen TerminalInput
  const availableRoutes = notes.map((note) => note.slug);

  return (
    <div className="flex flex-col gap-4">
      <p>
        <span className="text-blue-400">ridaz@greatest</span>:
        <span className="text-purple-400">~/garden</span> ls -la
      </p>

      {/* Tabel gaya CLI */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm md:text-base text-gray-300">
          <tbody>
            {notes.map((note) => (
              <tr key={note.slug} className="hover:bg-green-900/20 transition-colors">
                <td className="py-1 pr-4">drwxr-xr-x</td>
                <td className="py-1 pr-4">ridaz</td>
                <td className="py-1 pr-4">{note.size}</td>
                <td className="py-1 pr-4">{note.date}</td>
                <td className="py-1">
                  <Link href={`/${note.slug}`} className="text-blue-400 hover:underline font-bold">
                    {note.slug}/
                  </Link>
                  <span className="text-gray-500 text-xs ml-3 hidden md:inline-block">
                    # {note.title} • {note.readingTime}
                  </span>
                </td>
              </tr>
            ))}

            <tr className="hover:bg-green-900/20 transition-colors">
              <td className="py-1 pr-4">-rw-r--r--</td>
              <td className="py-1 pr-4">ridaz</td>
              <td className="py-1 pr-4">128</td>
              <td className="py-1 pr-4">Mar 01 16:00</td>
              <td className="py-1 text-gray-400">
                README.md
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-gray-500 italic">
        * Hint: Klik direktori berwarna biru untuk membuka catatan.
      </p>

      {/* Terminal */}
      <TerminalInput availableRoutes={availableRoutes} />
    </div>
  );
}