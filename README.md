# SainaFlow

**Intelligent project management for digital agencies**

## About

SainaFlow centralizes your projects, time tracking, invoicing, and AI-powered collaboration. The name "Saina" (Malagasy) means "intelligence" -- AI at the service of your productivity.

## Stack

- **Next.js 16** + **React 19** -- App Router, Server Components
- **TypeScript** -- Strict mode
- **PostgreSQL 17** + **Prisma 7** -- with pgvector extension
- **Tailwind CSS 4** + **shadcn/ui** -- Modern, accessible UI
- **Better Auth** -- Email OTP + Google OAuth
- **Inngest** -- Background jobs
- **OpenAI** -- AI-powered features

## Features

- **Dashboard** -- KPI cards, real-time charts (Tremor/Recharts)
- **Project Management** -- Kanban board with drag & drop, sections, WIP limits
- **Task Management** -- Assignees, priorities, tags, comments, file attachments
- **Time Tracking** -- Built-in stopwatch per task, weekly reports, billable hours
- **AI Assistant** -- Improve task descriptions, intelligent prioritization suggestions
- **Invoicing** -- Create, issue, pay invoices with multi-currency, tax rates, PDF export
- **Client Management** -- Full CRUD with company details, SIRET, status tracking
- **Team Management** -- Roles, departments, hourly rates
- **Comments & Notifications** -- Real-time collaboration on tasks
- **Global Search** -- Unified search across all entities
- **Audit Log** -- Full change trail with field-level diffs
- **Dark Mode** -- Full dark mode support
- **Responsive** -- Mobile-first design
- **i18n** -- English, French, Malagasy

## Design Identity

SainaFlow uses a distinctive design inspired by modern SaaS dashboards:

- **Primary**: Indigo (#4F46E5) -- Trust and professionalism
- **Secondary**: Violet (#7C3AED) -- Creativity and innovation
- **Accent**: Rose (#EC4899) -- Energy and action
- **Typography**: Inter (body) + Poppins (headings)
- **Animations**: Smooth fade-in, hover scale, transitions

## Installation

### Prerequisites

- Node.js >= 22.12.0
- pnpm >= 10.0.0
- PostgreSQL 17+ with pgvector

### Quick Start

```bash
git clone https://github.com/ramandimbsonMg/sainaflow-app.git
cd sainaflow-app
pnpm install
cp .env.example .env
cp .env.local.example .env.local
pnpm prisma generate
pnpm prisma migrate deploy
pnpm prisma db seed
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker (Recommended)

```bash
git clone https://github.com/ramandimbsonMg/sainaflow-app.git
cd sainaflow-app
cp .env.docker .env
nano .env  # Set ADMIN_EMAIL to a real email
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000) -- the app is ready with migrations and seed data.

### Environment Variables

**Required:**
- `DATABASE_URL` -- PostgreSQL connection string
- `BETTER_AUTH_SECRET` -- Auth secret

**Optional (AI features):**
- `OPENAI_API_KEY` -- AI assistant and embeddings
- `RESEND_API_KEY` -- Email delivery
- `GOOGLE_ID` / `GOOGLE_SECRET` -- Google OAuth

## Time Tracking

SainaFlow includes a built-in time tracker:

- Start/stop timer on any task
- Manual time entry
- Weekly time reports
- Billable vs non-billable hours
- Time tracking per user and per project

## AI Assistant

The AI assistant helps you:

- **Improve task descriptions** -- Get clearer, more actionable descriptions
- **Prioritize tasks** -- AI-suggested task ordering based on deadlines, dependencies, and history
- **Summarize progress** -- Get project status summaries

## Project Structure

```
sainaflow/
├── app/
│   ├── (auth)/          # Login, register, verify-otp
│   ├── (dashboard)/     # Main application
│   │   ├── overview/    # Dashboard with KPIs
│   │   ├── projects/    # Project management + Kanban
│   │   ├── tasks/       # My tasks, Team tasks
│   │   ├── time-tracker/ # Time tracking + reports
│   │   ├── clients/     # Client management
│   │   ├── invoices/    # Invoicing
│   │   ├── team/        # Team management
│   │   └── settings/    # User settings
│   └── api/             # API routes
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── dashboard/       # KPI cards, charts
│   ├── projects/        # KanbanBoard
│   ├── tasks/           # TaskAIAssistant
│   └── time-tracker/    # Timer component
├── lib/
│   ├── prisma/          # Database client
│   ├── auth/            # Authentication
│   └── ai/              # AI utilities
├── prisma/
│   └── schema.prisma    # Database schema
└── styles/
    └── theme.css        # Custom design tokens
```

## Tech Stack Details

### Frameworks

- [Next.js 16](https://nextjs.org/) -- React framework with App Router
- [Better Auth](https://www.better-auth.com/) -- TypeScript-first auth with email OTP and OAuth
- [Prisma 7](https://www.prisma.io/) -- TypeScript ORM for PostgreSQL
- [React Email](https://react.email/) -- Email templates

### UI

- [Tailwind CSS 4](https://tailwindcss.com/) -- Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) -- Reusable components
- [Tremor](https://www.tremor.so/) -- Dashboard charts
- [Recharts](https://recharts.org/) -- Data visualization
- [Lucide React](https://lucide.dev/) -- Icons
- [Framer Motion](https://www.framer.com/motion/) -- Animations

### AI & ML

- [OpenAI API](https://openai.com/) -- AI assistant and embeddings
- [pgvector](https://github.com/pgvector/pgvector) -- Vector similarity search
- [Inngest](https://www.inngest.com/) -- Background AI jobs

### Data

- [SWR](https://swr.vercel.app/) -- Data fetching
- [TanStack Table](https://tanstack.com/table) -- Data tables
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) -- Form validation

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Jest tests
pnpm test:e2e     # Run Playwright E2E tests
```

## Author

**Ramandimbson Espoir**
- Email: ramandimbsonespoir@gmail.com
- Portfolio: [ramandimbson-eta.vercel.app](https://ramandimbson-eta.vercel.app/)
- Website: [espoir-mg.netlify.app](https://espoir-mg.netlify.app/)

## License

MIT License -- see [LICENSE](./LICENSE.md) for details.
