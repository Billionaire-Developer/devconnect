# Tasks: DevConnect MVP

All tasks are pending until implementation evidence exists. No team assignments are assumed.

## 1. Application Foundation

- Keep the Next.js application at the repository root.
- Use the installed Next.js, React, TypeScript, Tailwind CSS, ESLint, and Prettier stack.
- Preserve npm and `package-lock.json`.
- Add responsive layout, loading, empty, success, and error-state conventions.

## 2. Authentication and Authorization

- Implement registration, login, and logout for `CLIENT` and `DEVELOPER` roles.
- Use planned Auth.js only after it is configured and verified.
- Enforce server-side role and ownership checks.
- Never trust browser-supplied user IDs or roles.

## 3. Data Setup

- Implement the three core entities: `UserAccount`, `DeveloperProfile`, and `ProjectInquiry`.
- Use planned PostgreSQL and Prisma only after they are configured and verified.
- Add the approved `PENDING`, `ACCEPTED`, and `DECLINED` status values.
- Store archiving in `archivedAt`, not in an additional status.
- Do not add status-history or moderation entities.

## 4. Developer Profiles

- Implement public directory listing and profile detail views.
- Implement DeveloperProfile create, read, edit, and removal flows.
- Restrict edits and removal to the owning developer.
- Preserve the account and existing inquiries when a profile is removed.
- Exclude password hashes and private account data from public responses.

## 5. Project Inquiries

- Implement client inquiry creation, reading, editing, and archival.
- Restrict pending inquiry edits and archival to the client owner.
- Restrict `PENDING` -> `ACCEPTED` or `PENDING` -> `DECLINED` to the recipient developer.
- Exclude archived inquiries from active lists.
- Prevent editing or status changes after archival.
- Use archival as the inquiry soft-delete operation.

## 6. Dashboards and API

- Build a dashboard showing inquiries relevant to the signed-in user.
- Implement a database-backed `/api/inquiries` Route Handler.
- Consume `/api/inquiries` from a Client Component.
- Return clear validation, authorization, loading, empty, success, and error states.

## 7. Verification

- Run `npm run lint`.
- Run `npm run build`.
- Run `npm run format:check`.
- Add tests only if the repository later configures an automated test runner.

## Deferred

Do not implement administration, moderation reports, audit history, reopening workflows, payments, bidding, chat, notifications, or image uploads.
