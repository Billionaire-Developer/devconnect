import type { Metadata } from "next";
import { DeveloperDirectory } from "@/components/developers/DeveloperDirectory";
import { getPublicDeveloperProfiles } from "@/lib/developerProfiles";

export const metadata: Metadata = {
  title: "Developer Directory | DevConnect",
  description: "Browse public sample developer profiles.",
};

export default function DevelopersPage() {
  const developers = getPublicDeveloperProfiles();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="mb-8">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Sample profiles
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          Developer directory
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          This directory uses fictional sample profiles while database-backed
          profiles are not yet configured.
        </p>
      </header>

      <DeveloperDirectory developers={developers} />
    </main>
  );
}
