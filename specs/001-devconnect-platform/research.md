# Research: DevConnect

## Decision: Use Next.js App Router with Auth.js and Prisma

**Decision**: The application will use Next.js App Router with TypeScript, Auth.js for authentication, Prisma as the ORM, and PostgreSQL as the primary datastore.

**Rationale**: This stack matches the product requirements and aligns with the intended deployment model on Vercel. The App Router supports route-level authorization patterns, server actions, and API routes with clear separation between public and private surfaces. Auth.js provides standard session handling and role-based access integration, while Prisma reduces schema complexity and validation overhead for profile and inquiry records.

**Alternatives considered**:
- Custom JWT session management: rejected because it increases implementation complexity and security maintenance overhead for a first release.
- Supabase or Firebase: rejected because the specification explicitly requires Prisma + PostgreSQL and a predictable server-side architecture.
- Separate frontend and backend apps: rejected because the feature scope is intentionally modest and should remain easy to maintain in a single web app.

## Decision: Treat inquiry records as auditable stateful entities rather than transient messages

**Decision**: Project inquiries are persisted records with explicit lifecycle states and raw audit history rather than ad hoc chat threads.

**Rationale**: The product requires controlled access, status transitions, archival, and a locked completed state. A persisted inquiry model supports authorization checks, history tracking, and governance without creating an unnecessary messaging system.

**Alternatives considered**:
- Free-form messaging threads: rejected because the product scope requires structured inquiry metadata and explicit status tracking.
- Immediate deletion on decline: rejected because archival requirements demand recorded history and non-destructive retention.

## Decision: Separate public profile data from private account data by design

**Decision**: Public profile pages display only intentionally shareable professional information, while account and moderation data remain private and server-side protected.

**Rationale**: The privacy requirement is fundamental to trust and security. This separation reduces the risk of data leakage and supports clear role and ownership checks.

**Alternatives considered**:
- Exposing full user records publicly: rejected because it would violate privacy expectations and increase risk.
- Putting profile and account data in the same API response: rejected because it creates leakage risk and weakens authorization boundaries.

## Decision: Use a narrow, admin-only moderation model for the first release

**Decision**: Administrators are limited to essential safety and governance operations: reviewing reports, restricting abusive records, and auditing account or inquiry actions.

**Rationale**: The initial scope requires trust and safety without broadening the product into a full marketplace or moderation platform. Admin access is restricted to the necessary privileges and protected by an explicit provisioning process.

**Alternatives considered**:
- Full self-service moderation by all users: rejected because it would create abuse risk and conflict with secure admin-only control.
- Full marketplace moderation tooling: rejected because it goes beyond v1 scope and increases operational complexity.

## Decision: Validate the inquiry lifecycle before persistence and on every update

**Decision**: All inquiry posts and updates must pass server-side validation and business-rule checks before application state changes are committed.

**Rationale**: This ensures malformed submissions are rejected, unauthorized updates are blocked, and the completed inquiry lock remains enforceable. It also creates stable behavior under database failures and partial writes.

**Alternatives considered**:
- Client-side-only validation: rejected because it is insufficient for security and authorization.
- Allowing all status transitions freely: rejected because it would violate the inquiry lifecycle rules and the trust model.

## Decision: Keep the initial release intentionally small and outcome-focused

**Decision**: The first release emphasizes developer discovery, inquiry flow, and moderation support, while excluding payments, escrow, bidding, and other commerce primitives.

**Rationale**: The product vision and constitution clearly prioritize user value, maintainability, and secure defaults over feature breadth. A narrow initial release reduces risk and aligns with the existing product constraints.

**Alternatives considered**:
- A full marketplace product with payments and transaction handling: rejected because it violates the stated product scope and would significantly increase operational and legal complexity.
- Reputation or bidding features: rejected because they are not necessary for the initial goal of trusted developer-client connection.
