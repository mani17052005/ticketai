# TicketAI

AI-powered IT Support Copilot — **Understand. Classify. Resolve.**

## What was corrected

The supplied React component has been converted into a complete Vite + React + Tailwind project suitable for GitHub.

- React + Vite structure
- Tailwind CSS configured
- Lucide React and Recharts dependencies
- GitHub Pages deployment workflow
- Relative Vite asset base for repository hosting
- Fixed `text-slate-10` typo → `text-slate-100`
- Removed unused React hooks import

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build test

```bash
npm run build
```

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `ticketai`.
2. Upload/push all files in this project.
3. Push to the `main` branch.
4. GitHub Actions will build and deploy automatically.
5. In GitHub: **Settings → Pages → Source**, select **GitHub Actions** if GitHub asks.
6. Your site will be available from the repository's Pages URL.

## Important

This current version is a frontend demonstration. The AI classification, similarity search, notifications and analytics use local demo state/rules. Do not present those as production ML/backend results.

For the competition's final architecture, connect this UI to the FastAPI + PostgreSQL + ML/embedding + LLM backend.
