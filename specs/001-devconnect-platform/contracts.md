# DevConnect API Contract Summary

## Core Principles

- All protected endpoints require authenticated users.
- Authorization is checked server-side for every write and read operation.
- Object-level access rules are enforced by ownership, role, and inquiry relationship.
- Archived records remain accessible for audit and recovery and are not deleted.
- Completed inquiries are not reopened through normal participant flows without an explicit override.

## Endpoints

### 1. GET /api/developers

**Purpose**: Return public developer directory listings.

**Access**: Public

**Response**: Array of public developer summaries with name, title, skills, availability, and portfolio metadata.

**Errors**:

- 500 when directory fetch fails
- 404 if the directory endpoint is not available

### 2. GET /api/developers/:id

**Purpose**: Fetch a single public developer profile.

**Access**: Public

**Response**: Public profile fields only; no private account details.

**Errors**:

- 404 for unknown developer
- 500 for database retrieval failure

### 3. POST /api/inquiries

**Purpose**: Create a new inquiry from a client to a target developer.

**Access**: Authenticated Client only

**Request body**:

```json
{
  "developerId": "uuid",
  "title": "Website redesign for a small business",
  "description": "Need a refreshed brand and better conversion flow.",
  "requiredSkills": ["Next.js", "Tailwind CSS"],
  "budget": 1500,
  "preferredTimeline": "4-6 weeks"
}
```

**Validation**:

- required fields must be present
- developer must be a valid profile target
- no unauthorized parties may create the inquiry

**Responses**:

- 201 created
- 400 invalid payload
- 403 unauthorized
- 500 database write failure

### 4. GET /api/inquiries

**Purpose**: List inquiries relevant to the authenticated user.

**Access**:

- Clients: only their own inquiries
- Developers: only inquiries addressed to them
- Admins: only as required by moderation policy

**Responses**:

- 200 with filtered inquiry list
- 403 unauthorized
- 500 retrieval failure

### 5. GET /api/inquiries/:id

**Purpose**: Retrieve a single inquiry record.

**Access**:

- Client owner only
- Developer target only
- Admins under authorized moderation rules

**Errors**:

- 403 forbidden
- 404 if inquiry does not exist
- 500 database issue

### 6. PATCH /api/inquiries/:id

**Purpose**: Update inquiry status or other allowed fields.

**Access**:

- Client: only editable inquiry fields allowed under policy
- Developer: only inquiry status transitions for incoming inquiries
- Admin: only for formal override or governance action

**Validation**:

- status transitions must be allowed
- completed inquiries cannot be reopened through normal participant flow
- archival is non-destructive

**Responses**:

- 200 updated
- 400 invalid status transition
- 403 unauthorized
- 409 on locked completed inquiry without override
- 500 on persistence failure

### 7. POST /api/reports

**Purpose**: Submit a moderation report or suspicious activity record.

**Access**: Authenticated user

**Validation**:

- reporter and reported user cannot be the same account
- report reason must be meaningful

### 8. GET /api/admin/moderation

**Purpose**: Access audit and moderation queues.

**Access**: Admin only

**Responses**:

- 200 list of moderation events
- 403 unauthorized
- 500 failure

## Security Requirements

- Server-side auth and role verification on every endpoint.
- No password hashes or private account details in public responses.
- Validation with Zod or equivalent before database writes.
- Database failures must fail safely without revealing stack traces.
- Archived records remain available for audit and follow-up.
- Completed inquiry records remain locked unless an explicit override rule authorizes a change.
