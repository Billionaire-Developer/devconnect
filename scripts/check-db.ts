import dotenv from "dotenv";

dotenv.config({ quiet: true });

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";

async function checkDatabase(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });

  try {
    const [userAccounts, developerProfiles, projectInquiries] =
      await Promise.all([
        prisma.userAccount.count(),
        prisma.developerProfile.count(),
        prisma.projectInquiry.count(),
      ]);

    console.log(`UserAccount: ${userAccounts}`);
    console.log(`DeveloperProfile: ${developerProfiles}`);
    console.log(`ProjectInquiry: ${projectInquiries}`);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase().catch(() => {
  console.error("Database check failed.");
  process.exitCode = 1;
});
