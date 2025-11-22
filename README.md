# Budget Tracker (Vite + React)

A complete budgeting frontend that works with any REST API matching the described contract or entirely offline in mock mode. It includes authentication, dashboards, CRUD pages, charts powered by Recharts, responsive layout, and plain CSS styling—no UI libraries required.

## Features

- Authentication flow with persistent sessions (token + user stored in `localStorage`)
- Protected routes via React Router v6 and an `AuthContext`
- Axios API layer with automatic `Authorization` headers and mock mode fallback
- Pages: Login, Register, Dashboard, Transactions, Categories
- Components: Navbar, ProtectedRoute, TransactionForm/List, CategoryForm, BalanceCard, IncomeExpenseCard, CategoryChart, IncomeExpenseChart, NetBalanceChart, RecentTransactions (Recharts + Framer Motion)
- Dashboard analytics: total balance, income/expense summary, pie chart by category, line & bar charts for monthly trends (all values displayed in Indian Rupees)
- Transactions CRUD with filters (type, category, date range) and sorting (date/amount), all amounts formatted as ₹ using Indian numbering
- Category CRUD with color tagging
- date-fns utilities for formatting and filtering dates
- Responsive layout built using plain CSS (flexbox/grid)

## Tech Stack

- [Vite](https://vitejs.dev/) + React 18
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Recharts](https://recharts.org/) for data viz
- [Framer Motion](https://www.framer.com/motion/) for smooth transitions
- [date-fns](https://date-fns.org/) for date handling

## Project Structure

```
├── public/
├── src/
│   ├── components/        # Navbar, cards, charts, forms, lists
│   ├── context/           # AuthContext
│   ├── mock/              # Mock data + API implementation
│   ├── pages/             # Login, Register, Dashboard, etc.
│   ├── services/          # Axios client + API helpers
│   ├── App.jsx / App.css  # Router + layout styles
│   └── main.jsx           # App bootstrap
└── README.md
```

## Getting Started

```bash
npm install
npm run dev
```

Visit the local URL printed by Vite (typically `http://localhost:5173`).

### Available Scripts

- `npm run dev` – start Vite dev server with HMR
- `npm run build` – production build
- `npm run preview` – serve the production build locally

## Environment Variables

Create a `.env` file (or copy `.env.example`) with:

```
VITE_API_URL=http://localhost:4000/api
# Mock mode is enabled by default. Set to "false" to hit a backend.
VITE_USE_MOCK=true
```

- `VITE_API_URL`: Base URL for all API requests.
- `VITE_USE_MOCK`: When `true` (default), all API calls are served by the local mock service so the UI works without a backend. Set to `false` to talk to your API.

## Mock Mode

Mock mode supplies in-memory categories, transactions, and summary statistics with small artificial delays to mimic network calls. Data persists for the session (page refresh resets it). The mock API implements the exact endpoints used by the app, so switching to a real backend only requires setting `VITE_USE_MOCK=false`.

## Expected Backend Endpoints

The Axios service targets the following REST endpoints (all prefixed by `VITE_API_URL`, default `http://localhost:4000/api`):

- `POST /auth/register`
- `POST /auth/login`
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /transactions`
- `POST /transactions`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`
- `GET /transactions/summary`

Responses should be JSON. Transactions should include at least `id`, `type`, `amount`, `date`, and `categoryId`; summaries should include totals, monthly trend data, and category breakdowns (the mock implementation is a reference).

## Styling

All styling lives in `src/App.css` and `src/index.css`, using CSS custom properties, flexbox, and CSS grid. No UI kits or preprocessors are required, so the project remains lightweight and easy to customize.

## License

This project is provided as-is under the MIT License. Modify freely for your budgeting needs.
