# DevConnect repository instructions

## Purpose and scope

DevConnect connects independent developers with clients through public
developer profiles and direct project inquiries.

The team approved a simplified MVP:

- Registration, login, and logout with CLIENT and DEVELOPER roles.
- Developer profile creation, reading, editing, and removal.
- Public developer directory with skill filtering and profile details.
- Clients can create, read, edit pending inquiries, and archive their inquiries.
- Recipient developers can accept or decline pending inquiries.
- A dashboard showing inquiries relevant to the signed-in user.
- Responsive pages with validation, loading, empty, and error states.

Do not add administration, moderation reports, audit-history tables,
payments, bidding, chat, notifications, or image uploads to this MVP.
Portfolio links are sufficient.

Earlier specification documents may describe a larger scope. Flag any
conflicts and follow this approved MVP rather than implementing deferred features.

## Stack and current implementation

Installed: Next.js App Router, React, TypeScript, Tailwind CSS,
ESLint, and Prettier. Use npm and preserve package-lock.json.

Planned, not yet configured: PostgreSQL, Prisma, and Auth.js.
Do not claim these integrations work until implemented and verified.
Do not introduce alternative frameworks or database providers without
a team decision.

Read AGENTS.md and the relevant documentation in
node_modules/next/dist/docs/ before writing Next.js code.

## Structure and conventions

Keep the Next.js application at the repository root. Do not move it
to apps/web or introduce a monorepo.

- app/: routes, layouts, and API Route Handlers.
- components/: reusable UI components.
- lib/: server-side data access, validation, and shared utilities.
- types/: shared application types when needed.
- prisma/: schema and migrations once Prisma is configured.

Use PascalCase for React component names and camelCase for variables
and functions. Follow Next.js route-file conventions.
Use explicit TypeScript types; avoid any.

Use Server Components by default and Client Components for interactive
behavior. Keep database access and secrets on the server.

## Planned core data model

- UserAccount: id, email, passwordHash, role, createdAt, updatedAt.
- DeveloperProfile: id, unique userId, displayName, professionalTitle,
  bio, skills, yearsOfExperience, availability, portfolioLinks.
- ProjectInquiry: id, clientId, developerId, title, description,
  requiredSkills, optional budget, optional preferredTimeline,
  status, optional archivedAt, createdAt, updatedAt.

A user has zero or one developer profile.
Each inquiry references a client account and a developer account.
Both accounts can be associated with many inquiries.

Inquiry statuses are PENDING, ACCEPTED, and DECLINED.
Archiving uses archivedAt rather than an additional status.
Do not add InquiryStatusHistory or moderation entities.

Coordinate shared schema changes with the authentication work.
If a developer profile is removed, preserve its account and existing inquiries.

## Authorization and validation

Validate inputs and enforce ownership and roles on the server.
Never trust user IDs or roles supplied by the browser.

Only the owning developer may modify or remove their profile.
Only the client owner may edit a pending, unarchived inquiry.
Only the recipient developer may accept or decline a pending,
unarchived inquiry.
Only the client owner may archive their inquiry.

Archived inquiries are excluded from active lists and cannot be
edited or receive status changes.

Public profile responses must not expose password hashes or private
account data. Never commit credentials or environment secrets.

## Course implementation targets

Support CRUD for DeveloperProfile and ProjectInquiry.
Inquiry archival serves as its soft-delete operation.

Include at least three distinct views and at least five components
reused across pages. Use server and client rendering where appropriate.

Implement a database-backed API Route Handler consumed by a Client
Component, including the planned /api/inquiries route.

Keep forms accessible, layouts responsive, and user feedback clear.

## Commands and verification

- npm install
- npm run dev
- npm run lint
- npm run build
- npm run format:check

Run relevant checks for the changes made and report actual results.
There is no automated test script configured yet.
Do not claim tests passed unless they were run.

## Collaboration

Keep changes focused on the assigned issue and use feature branches.
Describe implemented behavior, validation, and remaining work in PRs.

The W04 individual feature PR must contain meaningful code changes,
target main, and remain open for peer review.
Documentation and Copilot instructions use a separate PR intended
for integration into main.
