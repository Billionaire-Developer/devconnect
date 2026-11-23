# Database setup

DevConnect uses PostgreSQL hosted on Neon with Prisma 7.10.1.

## Local setup

1. Run `npm ci`.
2. Copy `.env.example` to `.env` only if `.env` does not already exist. Never overwrite an existing `.env`.
3. Fill in `DATABASE_URL` and `DATABASE_URL_UNPOOLED` privately. Do not share or commit either credential.
4. Run `npm run db:generate`, then `npm run db:check` to verify the connection and record counts.

`DATABASE_URL` is the pooled connection used by the application. `DATABASE_URL_UNPOOLED` is the direct connection used by Prisma CLI migrations.

The initial migration has already been applied to the shared database. Do not reset that database or recreate the initial migration. To set up a separate empty database, apply the committed migrations with `npx prisma migrate deploy`.

## Data model and usage

- `UserAccount` stores account credentials and the `CLIENT` or `DEVELOPER` role.
- `DeveloperProfile` contains a developer's public details and is related one-to-one with a user account.
- `ProjectInquiry` belongs to a client account and a recipient developer account; each account can be related to many inquiries.

Server-side application code imports the shared Prisma client:

```ts
import { prisma } from "@/lib/prisma";
```

Authentication, password hashing, role and ownership checks, and input validation remain application responsibilities. Auth.js integration is not implemented by this database branch.

Keep credentials and `generated/prisma` outside Git. The npm audit reported 7 moderate and 3 high findings; the suggested forced fix downgrades Prisma and was not applied.
