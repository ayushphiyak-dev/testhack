# EduWatch

A production-ready student complaint, verification, and accountability system for schools, colleges, and education authorities.

## Features

- **AI-Powered Verification**: Image quality checks, duplicate detection, fraud risk assessment, and category prediction
- **Community Confirmation**: Peer verification system to build confidence scores
- **Automatic Escalation**: Unresolved issues automatically escalate to government authorities
- **Transparent Tracking**: Real-time status updates with full audit trails
- **Institution Ratings**: Data-driven ratings based on verified complaint resolution performance
- **Anonymous Reporting**: Privacy-safe reporting option with metadata stripping
- **Role-Based Dashboards**: Separate experiences for Students, Institute Admins, Government Officials, and Platform Admins

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- Prisma + PostgreSQL (Database)
- Supabase (Auth, Storage, Realtime)
- OpenAI (Vision & Analysis)
- Resend (Email)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local .env
   # Edit .env with your credentials
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts

| Email | Role | Password |
|-------|------|----------|
| arjun@student.edu | Student | any |
| admin@dpsrkp.net | Institute Admin | any |
| officer@edu.gov.in | Government Official | any |
| platform@eduwatch.in | Platform Admin | any |

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # Reusable UI components
  lib/              # Utilities, mock data, AI logic
  store/            # Zustand state stores
  types/            # TypeScript type definitions
  hooks/            # Custom React hooks
prisma/
  schema.prisma     # Database schema
public/             # Static assets
```

## License

MIT License — Built for public good.
