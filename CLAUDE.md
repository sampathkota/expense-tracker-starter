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

This is a single-page React app with no routing, no backend, and no state management library. All state lives in `App.jsx` via `useState`.

**Data model** — each transaction has: `id`, `description`, `amount` (string), `type` (`"income"` | `"expense"`), `category`, `date`.

**Known bugs in the starter code (intentional — this is a course project):**
- `amount` is stored as a string, so `reduce` produces string concatenation instead of numeric sums — totals and balance are wrong.
- One seed transaction ("Freelance Work") is typed `"expense"` but categorized `"salary"` — inconsistent data.
- CSS defines `.delete-btn` but no delete button exists in the JSX yet.

## ESLint rules

Unused variables are an error unless the name starts with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
