# Implementation Plan: DevConnect

**Branch**: `001-devconnect-platform` | **Date**: 2026-11-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-devconnect-platform/spec.md`

## Summary

DevConnect is a trust-focused web platform for matching independent software developers with clients seeking technical help. The first release centers on authenticated user roles, public developer discovery, structured inquiry workflows, role-based access control, and minimal moderation capabilities. It intentionally excludes marketplace features such as payments, escrow, bidding, or complex contract automation.

The implementation will use a single Next.js App Router application with TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Zod, Vitest, and Playwright. The architecture will separate public browsing from protected dashboards and inquiry operations, using server-side validation, explicit authorization checks, and a strict inquiry lifecycle model.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js App Router
**Primary Dependencies**: Next.js, Auth.js, Prisma, PostgreSQL, Tailwind CSS, Zod, Vitest, Playwright
**Storage**: PostgreSQL
**Testing**: Vitest for unit/integration tests; Playwright for end-to-end flows
**Target Platform**: Vercel deployment with modern desktop/tablet/mobile browsers
**Project Type**: Web application
**Performance Goals**: Search results and inquiry dashboards should feel immediate for a small-to-mid-sized deployment; initial release targets common SaaS expectations for search, profile loading, and inquiry workflows.
**Constraints**: Role-based authorization must be enforced on the server; public profile data must remain separate from private account data; archive operations must preserve record history; no payment or bidding functionality in v1.
**Scale/Scope**: Initial release supports a modest user base, likely in the low thousands of registered users and project inquiries, with strong emphasis on correctness and auditability over scale.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **User Value First**: Pass. The product directly solves discoverability and trust gaps for clients and developers, with a defined initial release scope.
- **Evidence-Driven Delivery**: Pass. The specification includes measurable success criteria, edge cases, access rules, and failure states.
- **Test-First and Verified Quality**: Pass. The plan requires Vitest and Playwright coverage for validation, error handling, role authorization, and key inquiry flows.
- **Secure by Default**: Pass. The design explicitly requires server-side authorization, privacy boundaries, validation, and admin-only moderation access.
- **Simplicity and Maintainability**: Pass. The design favors a single web app, clear domain entities, and a narrow first release with no extraneous marketplace features.

**Conclusion**: No constitutional violations require a design exception.

## Project Structure

### Documentation (this feature)

```text
specs/001-devconnect-platform/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts.md
├── checklist.md
└── README.md (optional, only if needed)
```

### Source Code (repository root)

```text
apps/web/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── developers/
│   ├── inquiries/
│   └── api/
├── components/
│   ├── auth/
│   ├── developers/
│   ├── inquiries/
│   └── dashboard/
├── lib/
│   ├── auth/
│   ├── permissions/
│   ├── validation/
│   └── utils/
├── prisma/
│   └── schema.prisma
├── types/
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── vitest.config.ts
├── playwright.config.ts
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

**Structure Decision**: A single Next.js application will host auth, developer discovery, dashboards, and inquiry APIs. Prisma and PostgreSQL will back the data model, while the app folder and reusable components handle routes and UI composition.

## Planned Phases

### Phase 0 — Foundation and platform security

- Initialize the Next.js + TypeScript app, Prisma schema, PostgreSQL connection, and environment configuration.
- Implement Auth.js session handling with explicit role assignment for Client and Developer accounts.
- Establish server-side guard rails: middleware for route protection, role checks, and shared utilities for authorization and validation.
- Add the admin provisioning model: administrators are created only by trusted internal provisioning, with audit logging and no self-service role escalation.

### Phase 1 — Public discovery and developer profile experience

- Build the public developer directory with search, filtering, and empty-state handling for no results.
- Implement editable developer profile forms that separate public profile data from private account metadata.
- Expose public profile pages that allow unauthenticated browsing while preventing access to private account information.
- Add validation and failure handling for database read errors, malformed profile payloads, and permission boundaries.

### Phase 2 — Inquiry workflow and lifecycle enforcement

- Implement inquiry creation, validation, and assignment to a target developer.
- Enforce inquiry business rules: required fields, developer eligibility checks, client ownership boundaries, and rejects for invalid submissions.
- Model inquiry states as persisted records with auditable transitions such as Submitted, Accepted, Declined, and archived or closed terminal states as appropriate.
- Restrict updates to the owning client and authorized developer, with all state transitions validated server-side and previous state preserved on invalid operations.

### Phase 3 — Dashboard, moderation, and operational readiness

- Build client and developer dashboard views for inquiry tracking, status visibility, and account management.
- Add minimal administrator workflows for account review, abnormal behavior investigation, and moderation actions restricted to approved administrative access.
- Validate database write/read failure paths and ensure safe error responses without leaking internal information.
- Complete end-to-end coverage for search, inquiry creation, inquiry response behavior, authorization enforcement, and moderation guardrails.

## Security and Authorization Design

- Role assignment is limited to Client or Developer during signup; administrative access is only granted through a controlled provisioning path and not by self-service changes.
- Public developer profile pages intentionally exclude private account details and moderation metadata.
- Authorization checks are enforced on the server for every inquiry read/update and dashboard action, not on the client alone.
- Database errors and validation failures are converted into user-friendly, actionable messages while preserving a safe application state.
- The inquiry model records deliberate lifecycle transitions and remains auditable, rather than permitting arbitrary ad hoc chat state.

## Inquiry Lifecycle Alignment

The product requires a structured inquiry lifecycle that matches the specification:

1. A client creates an inquiry with required fields and a valid target developer.
2. The system validates inputs and business rules before persistence.
3. The inquiry is visible to the client as owner and to the target developer as recipient.
4. The target developer may accept or decline the inquiry; other status transitions are rejected unless explicitly authorized.
5. Terminal states prevent further operational changes and preserve prior history for auditability and reporting.
6. Any database failure during create, read, or update results in a safe failure state without exposing internal details.

## Testing Strategy

- Unit tests cover validation, authorization helpers, and inquiry state transitions.
- Integration tests verify database constraints, ownership checks, and rejection paths for invalid submissions.
- End-to-end tests exercise directory search, inquiry creation, developer inbox handling, and access denial scenarios.
- Negative tests ensure empty-state handling, failed database operations, and invalid status transitions remain safe and user-visible.

## Approval Note

This plan is intentionally aligned to the draft specification and is ready for stakeholder review. The product scope, security posture, and release boundaries are consistent with the current feature definition; final approval should be confirmed when the specification is formally accepted for implementation.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |
