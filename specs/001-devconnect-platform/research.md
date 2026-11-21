# Research: DevConnect

## Approved MVP Direction

Keep the implementation small and focused on public developer discovery, developer profile CRUD, project inquiry CRUD, and role-specific dashboards.

## Installed Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- npm

## Planned Integration Decisions

PostgreSQL, Prisma, and Auth.js remain planned rather than implemented. They may be used only after team implementation and verification.

No alternative database or authentication framework should be added without a team decision.

## Core Data

Use only `UserAccount`, `DeveloperProfile`, and `ProjectInquiry` as core entities.

Inquiry status values are `PENDING`, `ACCEPTED`, and `DECLINED`. Archiving uses `archivedAt` and does not introduce an archived status.

## Authorization Direction

Use server-side role and ownership checks:

- the profile owner manages the profile;
- the client owner creates, edits, and archives inquiries;
- the recipient developer accepts or declines pending inquiries;
- archived inquiries cannot be changed.

## Explicitly Deferred

Administration, moderation reports, audit-history tables, reopening workflows, payments, bidding, chat, notifications, and image uploads are deferred beyond the MVP.
