import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getPublicDeveloperProfile,
  getPublicDeveloperProfiles,
} from "@/lib/developerProfiles";

type DeveloperProfilePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getPublicDeveloperProfiles().map((developer) => ({
    id: developer.id,
  }));
}

export async function generateMetadata({
  params,
}: DeveloperProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const developer = getPublicDeveloperProfile(id);

  return {
    title: developer
      ? `${developer.name} | DevConnect`
      : "Developer Not Found | DevConnect",
  };
}

async function DeveloperProfile({
  params,
}: DeveloperProfilePageProps) {
  const { id } = await params;
  const developer = getPublicDeveloperProfile(id);

  if (!developer) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
      <Link
        href="/developers"
        className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400"
      >
        Back to directory
      </Link>

      <article className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Sample profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {developer.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              {developer.title}
            </p>
          </div>
          <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {developer.availability}
          </span>
        </div>

        <dl className="mt-8 grid gap-6 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Experience
            </dt>
            <dd className="mt-1 text-zinc-950 dark:text-zinc-50">
              {developer.yearsOfExperience} years
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Availability
            </dt>
            <dd className="mt-1 text-zinc-950 dark:text-zinc-50">
              {developer.availability}
            </dd>
          </div>
        </dl>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            About
          </h2>
          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
            {developer.bio}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Skills
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Skills">
            {developer.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Portfolio
          </h2>
          <ul className="mt-3 space-y-2">
            {developer.portfolioLinks.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-700 underline underline-offset-4 dark:text-blue-400"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

export default function DeveloperProfilePage({
  params,
}: DeveloperProfilePageProps) {
  return (
    <Suspense
      fallback={
        <main
          className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-12 sm:px-8"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading developer profile...
          </p>
        </main>
      }
    >
      <DeveloperProfile params={params} />
    </Suspense>
  );
}
