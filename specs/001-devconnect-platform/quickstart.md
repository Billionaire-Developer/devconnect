# Quickstart: DevConnect

## Goal

The DevConnect first release enables developer discovery, authenticated client inquiry creation, and explicit inquiry lifecycle management. It is intentionally scoped to a secure trust-based workflow and excludes payment or bidding functionality.

## Prerequisites

- Node.js 18+ or the project-supported LTS version
- PostgreSQL 14+ or the repository-supported version
- A package manager such as npm, pnpm, or yarn
- A local or Vercel-ready environment for deployment

## Local Setup

1. Clone the project repository.
2. Install dependencies.
3. Configure environment variables including auth secrets, database URL, and any moderation-related configuration.
4. Run database migrations and generate Prisma client.
5. Start the development server.

## Recommended Environment Variables

- DATABASE_URL
- AUTH_SECRET
- NEXTAUTH_URL or equivalent auth base URL
- ADMIN_EMAILS or admin provisioning configuration
- APP_ENV

## Core User Workflows

### Discover a developer
- Open the directory page.
- Filter by skill, experience, and availability.
- Review public profile information.
- Decide whether to submit an inquiry.

### Submit an inquiry
- Sign in as a Client.
- Select a target developer and complete the inquiry form.
- Verify required fields and submit.
- View the inquiry in the client dashboard.

### Respond to an inquiry
- Sign in as a Developer.
- Open the dashboard or inquiry inbox.
- Review incoming inquiries.
- Accept, decline, or mark the inquiry as completed according to the business rules.

### Handle misuse
- Sign in with an authorized administrator account.
- Review reports or suspicious activity.
- Restrict or suspend accounts or relevant inquiry records when required.
- Preserve records for auditing and follow-up.

## Testing Strategy

- Unit tests for validation, permission checks, and lifecycle helpers
- Integration tests for role-based access and inquiry workflows
- End-to-end tests for directory browsing, inquiry submission, and developer responses
- Focus on failure states for invalid submissions, unauthorized updates, and database errors

## Success Validation

The implementation is considered ready when:
- clients can discover developers and submit inquiries in a controlled flow;
- developers can accept or decline only relevant inquiries;
- role-based access checks block unauthorized actions;
- public profile information remains separate from private account data;
- archive and completion rules preserve historical records without destructive deletion.
