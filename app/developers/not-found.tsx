import Link from "next/link";

export default function DevelopersNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16">
      <div className="w-full rounded-2xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
        <p className="text-sm font-semibold text-zinc-500">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Developer not found
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          This public developer profile does not exist.
        </p>
        <Link
          href="/developers"
          className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Back to directory
        </Link>
      </div>
    </main>
  );
}
