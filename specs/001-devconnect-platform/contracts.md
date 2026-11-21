# API and UI Contracts

## Core Principles

- Validate inputs and enforce ownership and roles on the server.
- Do not trust browser-supplied user IDs or roles.
- Keep database access and secrets server-side.
- A database-backed `/api/inquiries` Route Handler is consumed by a Client Component.
- Public profile responses must not expose password hashes or private account data.

## Developer Profiles

The implementation should provide read and mutation operations for DeveloperProfile:

- `GET`: public profile/directory reads;
- `POST`: create the signed-in developer's profile;
- `PATCH`: update the signed-in developer's profile;
- `DELETE`: remove the signed-in developer's profile.

The owner must be determined from the authenticated session, not from the request body.

## Project Inquiries

The MVP requires a `/api/inquiries` API Route Handler with operations sufficient for:

- creating an inquiry as an authenticated `CLIENT`;
- listing inquiries relevant to the signed-in client or developer;
- retrieving an inquiry authorized for the client owner or recipient developer;
- editing a pending, unarchived inquiry as the client owner;
- accepting or declining a pending, unarchived inquiry as the recipient developer;
- archiving an inquiry as the client owner.

Use `archivedAt` for archival. Do not introduce a separate archived status or permanent-delete endpoint for normal archival.

## Response Requirements

- Return clear validation errors for malformed or incomplete payloads.
- Return authorization errors for role or ownership violations.
- Return safe database failure responses without internal details or stack traces.
- Return loading, empty, success, and error states to the UI.
