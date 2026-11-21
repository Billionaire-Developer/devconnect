# DevConnect Specification

**Feature**: Developer and client network
**Status**: Approved simplified MVP

## Purpose

DevConnect connects independent developers with clients through public profiles and direct project inquiries.

## MVP Scope

- Registration, login, and logout with `CLIENT` and `DEVELOPER` roles.
- Developer profile creation, reading, editing, and removal.
- Public directory with skill filtering and profile details.
- Client creation, reading, editing of pending unarchived inquiries, and archival.
- Developer acceptance or decline of pending unarchived inquiries directed to them.
- A dashboard for inquiries relevant to the signed-in user.
- Responsive pages with accessible forms and clear loading, empty, success, and error states.

Administration, moderation reports, audit-history tables, payments, bidding, chat, notifications, and image uploads are outside the MVP.

## Core Entities

- `UserAccount`
- `DeveloperProfile`
- `ProjectInquiry`

See [data-model.md](./data-model.md).

## Inquiry Lifecycle

Only `PENDING`, `ACCEPTED`, and `DECLINED` are status values.

- The client owner may edit a pending, unarchived inquiry.
- The recipient developer may accept or decline a pending, unarchived inquiry.
- The client owner may archive the inquiry.
- Archiving sets `archivedAt`; it does not add a status or delete the record.
- Archived inquiries are excluded from active lists and cannot be edited or receive status changes.
- No completed or reopened inquiry workflow is included.

## Authorization and Privacy

- Roles are `CLIENT` or `DEVELOPER`; server-side authorization controls access.
- Only the owning developer may modify or remove their profile.
- Public profile responses must not expose password hashes or private account data.
- The client owner may manage their own inquiries.
- The recipient developer may respond only to their pending inquiries.

## Functional Requirements

1. Implement DeveloperProfile CRUD.
2. Preserve the account and existing inquiries if a profile is removed.
3. Implement ProjectInquiry CRUD appropriate to the MVP, with archival as soft deletion.
4. Provide public directory search and profile detail views.
5. Provide a client/developer dashboard for relevant inquiries.
6. Implement a database-backed `/api/inquiries` Route Handler consumed by a Client Component.

## User-Visible States

Forms and read paths must handle validation feedback, loading, empty results, successful updates, and safe error messages without exposing internal details.
