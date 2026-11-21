# DevConnect

DevConnect is a responsive web platform for connecting independent developers with clients seeking technical services.

## Team Members

- Cesar Franco Chavez
- Lawani Covenant Jeremiah

## Approved MVP

- Registration, login, and logout for `CLIENT` and `DEVELOPER` accounts.
- Developer profile creation, reading, editing, and removal.
- A public developer directory with skill filtering and profile details.
- Client creation, reading, editing, and archival of their own pending inquiries.
- Developer acceptance or decline of pending inquiries directed to them.
- A dashboard for inquiries relevant to the signed-in user.
- Responsive pages with validation, loading, empty, success, and error states.

Administration, moderation reports, audit history, payments, bidding, chat, notifications, and image uploads are outside this MVP.

## Technology State

### Installed

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- npm

### Planned, not yet configured

- PostgreSQL
- Prisma
- Auth.js

Do not describe the planned integrations as working until they are implemented and verified. Keep the Next.js application at the repository root, not under `apps/web` or a monorepo.

## Core Model

- `UserAccount`
- `DeveloperProfile`
- `ProjectInquiry`

Inquiry statuses are `PENDING`, `ACCEPTED`, and `DECLINED`. Archiving uses `archivedAt`, is soft deletion, and does not add an archived status. Archived inquiries are excluded from active lists and cannot be edited or receive status changes.

## Getting Started

Prerequisites: Node.js and npm.

```bash
git clone https://github.com/Billionaire-Developer/devconnect.git
cd devconnect
npm install
npm run dev
```

Open `http://localhost:3000`.

Database setup and authentication setup are not currently complete.

## Available Scripts

| Command                | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Starts the development server       |
| `npm run build`        | Builds the application              |
| `npm run lint`         | Runs ESLint                         |
| `npm run format`       | Formats project files with Prettier |
| `npm run format:check` | Checks code formatting              |

## Repository

[GitHub - DevConnect](https://github.com/Billionaire-Developer/devconnect)
