import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col gap-4 mt-4">
            <p>
                <span className="text-blue-400">ridaz@greatest</span>:
                <span className="text-purple-400">~/garden</span>$ cat error.log
            </p>

            <div className="border-l-4 border-red-500 bg-red-950/20 pl-4 py-3 my-2">
                <p className="text-red-400 font-bold mb-1">
                    [ERROR 404] Directory or file not found.
                </p>
                <p className="text-gray-400 text-sm">
                    The requested path could not be resolved in the current filesystem.
                    It might have been deleted, moved, or you just mistyped the command.
                </p>
            </div>

            <div className="mt-4">
                <Link
                    href="/"
                    className="bg-green-950 hover:bg-green-900 text-green-400 px-4 py-2 rounded border border-green-800 transition-colors inline-block font-bold"
                >
                    $ cd ~/garden
                </Link>
            </div>
        </div>
    );
}