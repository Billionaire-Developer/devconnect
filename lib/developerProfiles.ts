import type { PublicDeveloperProfile } from "@/types/developerProfile";

export const sampleDeveloperProfiles: PublicDeveloperProfile[] = [
  {
    id: "maya-patel",
    name: "Maya Patel",
    title: "Full-Stack Web Developer",
    bio: "Builds accessible web applications for small businesses, with a focus on reliable APIs and thoughtful user experiences.",
    skills: ["Next.js", "TypeScript", "PostgreSQL"],
    yearsOfExperience: 7,
    availability: "AVAILABLE",
    portfolioLinks: ["https://example.com/maya-patel"],
  },
  {
    id: "leo-martinez",
    name: "Leo Martinez",
    title: "Frontend Engineer",
    bio: "Creates responsive, polished interfaces and design systems for product teams.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    yearsOfExperience: 5,
    availability: "BUSY",
    portfolioLinks: ["https://example.com/leo-martinez"],
  },
  {
    id: "noor-hassan",
    name: "Noor Hassan",
    title: "Backend Developer",
    bio: "Designs secure services and data models for growing applications and internal tools.",
    skills: ["Node.js", "PostgreSQL", "API Design"],
    yearsOfExperience: 9,
    availability: "AVAILABLE",
    portfolioLinks: ["https://example.com/noor-hassan"],
  },
  {
    id: "jordan-chen",
    name: "Jordan Chen",
    title: "Mobile and Web Developer",
    bio: "Develops cross-platform products with consistent experiences across desktop and mobile.",
    skills: ["React", "React Native", "TypeScript"],
    yearsOfExperience: 4,
    availability: "UNAVAILABLE",
    portfolioLinks: ["https://example.com/jordan-chen"],
  },
];

export function getPublicDeveloperProfiles(): PublicDeveloperProfile[] {
  return sampleDeveloperProfiles;
}

export function getPublicDeveloperProfile(
  id: string,
): PublicDeveloperProfile | undefined {
  return sampleDeveloperProfiles.find((profile) => profile.id === id);
}

export function filterPublicDeveloperProfiles(
  profiles: PublicDeveloperProfile[],
  skill: string,
): PublicDeveloperProfile[] {
  if (!skill || skill === "All") {
    return profiles;
  }

  return profiles.filter((profile) => profile.skills.includes(skill));
}
