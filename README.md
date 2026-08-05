# EverMind AI — Second Brain

An AI-powered second brain. Capture thoughts instantly, let AI tag and summarize them, and surface actionable insights from your data — wrapped in a premium glassmorphic dark UI.

## Features

- **Bento dashboard** — KPI cards with live sparkline trends, quick capture, memory grid, and AI insights
- **Quick Capture** — type a thought, AI auto-tags it (Work, Idea, Dev, Health…) with a simulated real-time tagging flow
- **Memory Grid** — 8 glassmorphic sample memories with AI summaries, tags, and dates; hover lift + layout animations
- **Global search** — `Ctrl/Cmd + K` to focus, live-filtering the memory grid
- **Collapsible sidebar** — icon-only mode with tooltips, active-pill animation, mobile drawer
- **Notifications & user menus** — unread states, mark-all-read, profile dropdown
- **AI Insights** — 3 data-driven suggestions with micro-interactions
- **Fully responsive** — mobile, tablet, and desktop layouts
- **Page transitions** — route-based enter/exit animations via Framer Motion

## Tech Stack

| Layer      | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | Vite + React 18 + TypeScript            |
| Styling    | Tailwind CSS v4 + shadcn/ui primitives  |
| Animation  | Framer Motion                           |
| Icons      | lucide-react                            |
| State      | Zustand (v5)                            |
| Routing    | react-router-dom (HashRouter)           |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run lint       # eslint
npm run preview    # serve the production build
```

## Structure

```
src/
├── components/
│   ├── dashboard/     # KpiCard, QuickCapture, MemoryGrid, AiInsights
│   ├── layout/        # AppShell, Sidebar, TopNavbar, AmbientBackground
│   └── ui/            # shadcn-style primitives (button, card, badge, …)
├── lib/               # utils (cn) + mock data
├── pages/             # DashboardPage, PlaceholderPage
└── store/             # Zustand app store
```

## Data

Fully mocked — no backend required. All state lives in the Zustand store, so wiring a real API later is a drop-in change.

## License

MIT
