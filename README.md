GitHub Repository Explorer
A modern Next.js application for searching GitHub users and exploring their repositories with real-time autocomplete and detailed repository information.
Features

User Search with Autocomplete: Real-time GitHub user search with suggestions
Debounced Search: 300ms debouncing to reduce API calls
Repository Grid: Responsive card layout for repositories
Repository Details: Comprehensive repository information page
Responsive Design: Mobile-first design with Tailwind CSS
Error Handling: User-friendly error messages and loading states

Tech Stack

Next.js 14 - React framework with App Router
TypeScript - Type-safe development
Tailwind CSS - Utility-first styling
shadcn/ui - Modern UI components
GitHub REST API - Repository and user data

Project Structure
src/
├── app/
│ ├── page.tsx # User Search Page
│ └── repository/[owner]/[repo]/page.tsx # Repository Detail Page
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── SearchInput.tsx # Search with autocomplete
│ └── RepositoryCard.tsx # Repository display card
├── lib/
│ ├── github-api.ts # GitHub API integration
│ └── hooks/
│ ├── useDebounce.ts # Debouncing hook
│ └── useGitHubSearch.ts # GitHub search hook
└── types/
└── github.ts # TypeScript definitions
Setup

Clone and install
git clone <repository-url>
cd github-repository-explorer
npm install

Optional: Add GitHub token for higher rate limits
h# .env.local
GITHUB_TOKEN=your_github_token_here

Run development server
npm run dev

Open http://localhost:3000

Usage

Search for GitHub users in the search field
Select a user from autocomplete suggestions
Browse their repositories in the grid layout
Click any repository card for detailed information

API Rate Limits

Without token: 60 requests/hour
With GitHub token: 5,000 requests/hour

Deployment
Ready for deployment on Vercel, Netlify, or any Node.js hosting platform.
License
MIT License
