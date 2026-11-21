# Implementation Plan: DevConnect

**Branch**: `001-devconnect-platform`
**Status**: Documentation for the approved MVP

## Summary

The application is a single Next.js App Router project at the repository root. It supports public developer discovery, developer profile CRUD, client and developer dashboards, and the approved inquiry lifecycle.

## Technology State

### Installed

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- npm

### Planned

- PostgreSQL
- Prisma
- Auth.js

These planned integrations are not installed or verified by this document.

## Repository Structure

```text
/
├── app/
├── components/
├── lib/
├── types/
├── prisma/       # after Prisma is configured
└── specs/
```

The application must not be moved to `apps/web` or a monorepo.

## Implementation Areas

1. Authentication routes and server-side role checks for `CLIENT` and `DEVELOPER`.
2. DeveloperProfile create, read, edit, and remove flows.
3. Public developer directory and profile detail views.
4. ProjectInquiry creation, reading, editing, developer response, and archival.
5. A database-backed `/api/inquiries` Route Handler consumed by a Client Component.
6. Responsive shared layouts, accessible forms, and loading, empty, success, and error states.

## Authorization

- Validate every inbound payload and enforce role and ownership on the server.
- Allow only the owning developer to modify or remove a profile.
- Allow only the client owner to edit or archive pending unarchived inquiries.
- Allow only the recipient developer to accept or decline pending unarchived inquiries.
- Exclude archived inquiries from active lists.
- Keep database access and secrets server-side.

## Deferred Scope

Do not implement administration, moderation, audit-history tables, report workflows, reopening workflows, payments, bidding, chat, notifications, or image uploads.

## Verification

Run repository checks only after implementation:

- `npm run lint`
- `npm run build`
- `npm run format:check`

No automated test suite is currently configured.
