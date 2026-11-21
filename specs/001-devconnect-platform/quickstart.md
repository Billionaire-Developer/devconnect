# Quickstart: DevConnect

## Current Status

The repository has Next.js App Router, React, TypeScript, Tailwind CSS, ESLint, Prettier, and npm installed. PostgreSQL, Prisma, and Auth.js are planned and are not yet configured.

The application is kept at the repository root.

## Prerequisites

- Node.js
- npm

## Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Do not claim database setup, authentication setup, automated tests, deployment, or production readiness until those areas are implemented and verified.

## Available Checks

```bash
npm run lint
npm run build
npm run format:check
```

No automated test script is currently configured.

## MVP Workflows

1. Register or sign in as `CLIENT` or `DEVELOPER`.
2. Developers manage public profile data.
3. Clients browse developers and create inquiries.
4. The recipient developer accepts or declines pending inquiries.
5. The client edits pending unarchived inquiries or archives them.
6. Each user sees only relevant inquiries in the dashboard.
