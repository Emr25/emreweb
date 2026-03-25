import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#030306] px-4 text-center text-zinc-100">
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="mt-2 text-zinc-400">This page could not be found.</p>
        <Link
          href="/"
          className="mt-6 text-cyan-400 underline-offset-4 hover:underline"
        >
          Home
        </Link>
      </body>
    </html>
  );
}
