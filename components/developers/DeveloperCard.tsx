import Link from "next/link";
import type { PublicDeveloperProfile } from "@/types/developerProfile";

type DeveloperCardProps = {
  developer: PublicDeveloperProfile;
};

export function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {developer.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {developer.title}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {developer.availability}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {developer.bio}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills">
        {developer.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            {skill}
          </li>
        ))}
      </ul>

      <Link
        href={`/developers/${developer.id}`}
        className="mt-6 inline-flex text-sm font-semibold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400"
        aria-label={`View ${developer.name}'s profile`}
      >
        View profile
      </Link>
    </article>
  );
}
