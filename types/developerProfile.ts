export type DeveloperAvailability =
  | "AVAILABLE"
  | "BUSY"
  | "UNAVAILABLE";

export type PublicDeveloperProfile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  skills: string[];
  yearsOfExperience: number;
  availability: DeveloperAvailability;
  portfolioLinks: string[];
};
