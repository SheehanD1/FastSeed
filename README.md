# Startup Investment Platform

A full-stack application where startups can create profiles, and users can browse and "invest" in them. The platform includes an admin dashboard for managing startup submissions and uses AI to score startup success probability.

## Features

- Startup profile creation with company details, metrics, and pitch deck
- Public browsing of approved startups
- Leaderboard of most successful startups
- Admin dashboard for approving/rejecting submissions
- AI-powered success probability scoring
- Clean, modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database)
- OpenAI API (for success scoring)
- LangChain (for AI integration)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/lib/` - Utility functions and configurations
- `src/types/` - TypeScript type definitions

## API Routes

- `GET /api/startups` - Get all approved startups
- `POST /api/startups/submit` - Submit a new startup
- `PUT /api/startups/[id]/approve` - Approve a startup
- `PUT /api/startups/[id]/reject` - Reject a startup

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
