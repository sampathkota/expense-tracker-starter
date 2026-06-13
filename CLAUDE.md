# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint across all JS/JSX files
```

## Architecture

Single-page React app with no routing, no backend, and no state management library.

**Component tree:**
```
App
├── Summary          — receives transactions, computes and displays income/expenses/balance
├── TransactionForm  — owns its own form state, calls onAdd(transaction) prop when submitted
└── TransactionList  — owns filter state, receives transactions and renders the filtered table
```

**State ownership:**
- `transactions` array lives in `App` and is the single source of truth
- Form field state (description, amount, type, category) lives in `TransactionForm`
- Filter state (filterType, filterCategory) lives in `TransactionList`

**Data model** — each transaction has: `id`, `description`, `amount` (number), `type` (`"income"` | `"expense"`), `category`, `date` (YYYY-MM-DD string).

**Known issue in starter data (intentional — this is a course project):**
- One seed transaction ("Freelance Work") is typed `"expense"` but categorized `"salary"` — inconsistent data.
- CSS defines `.delete-btn` but no delete button exists in the JSX yet.

## ESLint rules

Unused variables are an error unless the name starts with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
