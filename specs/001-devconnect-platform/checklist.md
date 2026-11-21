# MVP Documentation Checklist

This checklist documents scope decisions. Items below are not implementation-complete unless separately verified.

## Scope

- [ ] Registration, login, and logout support `CLIENT` and `DEVELOPER`.
- [ ] DeveloperProfile CRUD is implemented.
- [ ] Public directory and profile details are implemented.
- [ ] ProjectInquiry CRUD and archival are implemented.
- [ ] Recipient developers can accept or decline pending inquiries.
- [ ] Client and developer dashboards show relevant inquiries.
- [ ] Responsive loading, empty, success, and error states are implemented.

## Data

- [ ] `UserAccount` is implemented.
- [ ] `DeveloperProfile` is implemented.
- [ ] `ProjectInquiry` is implemented.
- [ ] Inquiry status is restricted to `PENDING`, `ACCEPTED`, and `DECLINED`.
- [ ] Archival uses `archivedAt`.
- [ ] Archived inquiries cannot be edited or receive status changes.

## Security

- [ ] Authentication and server-side authorization are verified.
- [ ] The profile owner is the only account that can edit/remove the profile.
- [ ] The client owner is the only account that can edit/archive the inquiry.
- [ ] The recipient developer is the only account that can respond to it.
- [ ] Public responses exclude password hashes and private account data.

## Architecture

- [ ] The Next.js application remains at the repository root.
- [ ] The `/api/inquiries` Route Handler is database-backed.
- [ ] A Client Component consumes `/api/inquiries`.
- [ ] PostgreSQL, Prisma, and Auth.js are configured and verified.
- [ ] The project does not include administration or moderation in the MVP.
- [ ] The project does not include audit-history or inquiry-status-history entities.

## Verification

- [ ] `npm run lint` has been run and results recorded.
- [ ] `npm run build` has been run and results recorded.
- [ ] `npm run format:check` has been run and results recorded.
- [ ] Automated tests are configured and relevant flows are passing.

No checklist item is marked complete because this documentation update does not prove implementation or test status.
