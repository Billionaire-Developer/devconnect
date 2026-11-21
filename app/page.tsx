import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
          DevConnect
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Find independent developers for your next project.
        </h1>
        <Link
          href="/developers"
          className="mt-8 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Browse developers
        </Link>
      </div>
    </main>
  );
}
