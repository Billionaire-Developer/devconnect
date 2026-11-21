"use client";

import { useMemo, useState } from "react";
import type { PublicDeveloperProfile } from "@/types/developerProfile";
import { filterPublicDeveloperProfiles } from "@/lib/developerProfiles";
import { DeveloperCard } from "@/components/developers/DeveloperCard";

type DeveloperDirectoryProps = {
  developers: PublicDeveloperProfile[];
};

export function DeveloperDirectory({ developers }: DeveloperDirectoryProps) {
  const [selectedSkill, setSelectedSkill] = useState("All");

  const skills = useMemo(
    () =>
      Array.from(
        new Set(developers.flatMap((developer) => developer.skills)),
      ).sort((a, b) => a.localeCompare(b)),
    [developers],
  );

  const filteredDevelopers = filterPublicDeveloperProfiles(
    developers,
    selectedSkill,
  );

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="w-full max-w-xs">
          <label
            htmlFor="skill-filter"
            className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Filter by skill
          </label>
          <select
            id="skill-filter"
            value={selectedSkill}
            onChange={(event) => setSelectedSkill(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="All">All skills</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredDevelopers.length === 0 ? (
        <div
          role="status"
          className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700"
        >
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            No developers match this skill
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Choose another skill or view all developers.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      )}
    </div>
  );
}
