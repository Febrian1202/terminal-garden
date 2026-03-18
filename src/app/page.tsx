import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import TerminalInput from "./TerminalInput";

function getNotes() {
  const appDir = path.join(process.cwd(), "src/app");
  const folders = fs.readdirSync(appDir, { withFileTypes: true });
  const notes = [];

  for (const dirent of folders) {
    if (!dirent.isDirectory()) continue;

    const folderName = dirent.name;
    const mdxPath = path.join(appDir, folderName, "page.mdx");

    if (fs.existsSync(mdxPath)) {
      const fileContent = fs.readFileSync(mdxPath, "utf-8");
      const { data } = matter(fileContent);
      const stats = fs.statSync(mdxPath);

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
  const availableRoutes = notes.map((note) => note.slug);

  return (
    <div className="flex flex-col gap-4">
      <p>
        <span className="text-cyan-300">ridaz@fedora</span>:
        <span className="text-blue-400">~/garden</span> ls -la
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm md:text-base text-slate-400">
          <tbody>
            {notes.map((note) => (
              <tr key={note.slug} className="hover:bg-cyan-900/20 transition-colors">
                <td className="py-1 pr-4 text-cyan-600">drwxr-xr-x</td>
                <td className="py-1 pr-4">ridaz</td>
                <td className="py-1 pr-4">{note.size}</td>
                <td className="py-1 pr-4">{note.date}</td>
                <td className="py-1">
                  <Link href={`/${note.slug}`} className="text-cyan-300 hover:text-cyan-100 hover:underline font-bold">
                    {note.slug}/
                  </Link>
                  <span className="text-slate-500 text-xs ml-3 hidden md:inline-block">
                    # {note.title} • {note.readingTime}
                  </span>
                </td>
              </tr>
            ))}

            <tr className="hover:bg-cyan-900/20 transition-colors">
              <td className="py-1 pr-4 text-slate-600">-rw-r--r--</td>
              <td className="py-1 pr-4">ridaz</td>
              <td className="py-1 pr-4">128</td>
              <td className="py-1 pr-4">Mar 01 16:00</td>
              <td className="py-1 text-slate-500">
                README.md
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-slate-500 italic">
        * Hint: Klik direktori berwarna cyan untuk membuka catatan.
      </p>

      <TerminalInput availableRoutes={availableRoutes} />
    </div>
  );
}