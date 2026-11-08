# Data Model: DevConnect

## Entity Overview

The data model is intentionally small, clear, and aligned to the v1 product scope. It focuses on users, public developer profiles, project inquiries, and a minimal moderation layer.

## 1. UserAccount

Represents a platform user and determines role and account-level permissions.

**Fields**

- id: UUID
- email: string, unique, lowercased
- passwordHash: string
- role: enum { CLIENT, DEVELOPER }
- status: enum { ACTIVE, SUSPENDED, DEACTIVATED }
- createdAt: datetime
- updatedAt: datetime
- lastLoginAt: datetime | null

**Relationships**

- One UserAccount has zero or one DeveloperProfile
- One UserAccount can submit many ProjectInquiry records
- One UserAccount can receive many ProjectInquiry records when acting as a developer target
- One UserAccount may have many AccountReport or ModerationEvent records

**Validation rules**

- Email must be valid and unique.
- Role must be fixed at creation and cannot be changed through self-service flows.
- Status cannot be set to an invalid enum value.

## 2. DeveloperProfile

Represents the public-facing professional identity of a developer.

**Fields**

- id: UUID
- userId: UUID, unique FK to UserAccount
- displayName: string
- professionalTitle: string
- bio: text
- skills: string[] or JSON array
- yearsOfExperience: integer
- availability: enum { AVAILABLE, BUSY, UNAVAILABLE }
- portfolioLinks: string[]
- profileImageUrl: string | null
- isPublic: boolean
- createdAt: datetime
- updatedAt: datetime

**Relationships**

- Many-to-one with UserAccount
- One DeveloperProfile can be referenced by many ProjectInquiry records as the target developer

**Validation rules**

- Skills must not be empty if the profile is public.
- Portfolio links must be valid URLs when present.
- Public profile fields must not include private account details.

## 3. ProjectInquiry

Represents a client-initiated request to a developer.

**Fields**

- id: UUID
- clientId: UUID FK to UserAccount
- developerId: UUID FK to UserAccount
- title: string
- description: text
- requiredSkills: string[]
- budget: decimal | null
- preferredTimeline: string | null
- status: enum { PENDING, ACCEPTED, DECLINED, COMPLETED, ARCHIVED }
- createdAt: datetime
- updatedAt: datetime
- archivedAt: datetime | null
- completedAt: datetime | null

**Relationships**

- Many-to-one with Client user
- Many-to-one with Developer target user
- One inquiry has one current status and can have many InquiryStatusHistory entries

**Validation rules**

- Title and description are required.
- Client and developer must be valid users and not the same user.
- Status transitions must follow the business lifecycle rules.
- Once status is COMPLETED, ordinary participant modifications must be rejected unless a formal override is defined.
- Archive does not delete the inquiry; it only marks it archived.

## 4. InquiryStatusHistory

Tracks how an inquiry changes over time.

**Fields**

- id: UUID
- inquiryId: UUID FK to ProjectInquiry
- previousStatus: enum | null
- newStatus: enum
- changedByUserId: UUID FK to UserAccount
- reason: text | null
- createdAt: datetime

**Relationships**

- Many-to-one with ProjectInquiry
- Many-to-one with UserAccount

**Validation rules**

- Must reflect an allowed lifecycle step.
- Must be retained for auditability.

## 5. ModerationEvent

Captures platform governance actions for reports or suspicious activity.

**Fields**

- id: UUID
- targetUserId: UUID | null FK to UserAccount
- targetInquiryId: UUID | null FK to ProjectInquiry
- type: enum { ACCOUNT_REPORT, SUSPECTED_ABUSE, INQUIRY_RESTRICTION, ACCOUNT_SUSPENSION }
- summary: text
- createdByUserId: UUID FK to UserAccount
- resolvedAt: datetime | null
- resolution: text | null
- createdAt: datetime

**Relationships**

- Optional link to a user or inquiry
- Many-to-one with the acting administrator account

**Validation rules**

- A moderation event must have a valid creator and a defined type.
- Resolution state must be recorded for audit purposes.

## 6. AccountReport

Optional lightweight report model for user-generated concerns.

**Fields**

- id: UUID
- reporterUserId: UUID FK to UserAccount
- reportedUserId: UUID FK to UserAccount
- inquiryId: UUID | null FK to ProjectInquiry
- reason: text
- status: enum { OPEN, REVIEWED, RESOLVED, REJECTED }
- createdAt: datetime
- reviewedAt: datetime | null

**Relationships**

- One reporter user
- One reported user
- Optional relation to inquiry

**Validation rules**

- Reporter and reported user cannot be the same account.
- Report reasons must have a minimum meaningful length.

## Relationships Summary

- UserAccount 1--1 DeveloperProfile
- UserAccount 1--many ProjectInquiry (as client)
- UserAccount 1--many ProjectInquiry (as developer target)
- ProjectInquiry 1--many InquiryStatusHistory
- ProjectInquiry 1--many ModerationEvent (optional)
- UserAccount 1--many AccountReport
- UserAccount 1--many ModerationEvent

## Lifecycle Rules

ProjectInquiry status transitions: PENDING -> ACCEPTED | DECLINED | COMPLETED | ARCHIVED

- ACCEPTED and DECLINED are final participant decisions for active inquiries.
- COMPLETED is a terminal state for ordinary participant updates.
- ARCHIVED is a non-destructive lifecycle state used to preserve a historical record.
- Completed inquiries require explicit administrative override for reopening or modification.
