# Data Model: DevConnect

The MVP has exactly three core entities.

## UserAccount

- `id`: UUID primary key.
- `email`: required, unique string normalized to lowercase.
- `passwordHash`: required string; never exposed in API responses.
- `role`: `CLIENT` or `DEVELOPER`.
- `createdAt`: timestamp.
- `updatedAt`: timestamp.

A user has zero or one DeveloperProfile.

## DeveloperProfile

- `id`: UUID primary key.
- `userId`: required, unique UUID foreign key to UserAccount.
- `displayName`: required string.
- `professionalTitle`: required string.
- `bio`: required string.
- `skills`: string array.
- `yearsOfExperience`: non-negative integer.
- `availability`: `AVAILABLE`, `BUSY`, or `UNAVAILABLE`.
- `portfolioLinks`: string array containing valid HTTP/HTTPS URLs.
- `createdAt`: timestamp.
- `updatedAt`: timestamp.

Profile creation is restricted to `DEVELOPER` accounts. Only the owning developer may modify or remove the profile. Removing a profile preserves its UserAccount and existing inquiries.

## ProjectInquiry

- `id`: UUID primary key.
- `clientId`: required UUID foreign key to UserAccount.
- `developerId`: required UUID foreign key to UserAccount.
- `title`: required non-empty string.
- `description`: required non-empty string.
- `requiredSkills`: string array.
- `budget`: nullable non-negative decimal.
- `preferredTimeline`: nullable string.
- `status`: `PENDING`, `ACCEPTED`, or `DECLINED`; default `PENDING`.
- `archivedAt`: nullable timestamp; default `null`.
- `createdAt`: timestamp.
- `updatedAt`: timestamp.

Each inquiry belongs to one client account and one recipient developer account. Both account types may be associated with many inquiries.

`clientId` must come from the authenticated `CLIENT` session. `developerId` must identify a `DEVELOPER` account with an existing DeveloperProfile. The client and developer must be different accounts.

Only the client owner may edit a pending, unarchived inquiry. Only the recipient developer may accept or decline a pending, unarchived inquiry.

## Archival

`archivedAt` soft-deletes an inquiry for active application behavior. It is not an additional status.

Archived inquiries:

- are excluded from active lists;
- cannot be edited;
- cannot receive status changes;
- remain associated with their existing accounts.
