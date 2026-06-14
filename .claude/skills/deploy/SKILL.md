---
name: deploy
description: Deploy the app to staging by running lint, building the production bundle, and pushing to the staging branch. Triggered by /deploy or when the user says "deploy", "ship to staging", or "push to staging".
---

Run the full deploy pipeline for this project: lint → build → push to staging.

## Steps

### 1. Run lint (tests)

```bash
npm run lint
```

- If lint fails, **stop immediately** and report the errors. Do not proceed to build or push.
- Tell the user what failed and which files need fixing.

### 2. Build the production bundle

```bash
npm run build
```

- If the build fails, **stop immediately** and report the error. Do not push.
- A successful build outputs to `dist/`.

### 3. Push to staging

Push the current branch to the `staging` branch on origin:

```bash
git push origin HEAD:staging
```

- If the `staging` branch doesn't exist remotely, this command will create it.
- Report the resulting git output to the user.

## Reporting

After each step, tell the user:
- What ran and whether it passed or failed
- Any warnings or errors (even if non-fatal)

At the end of a successful deploy, summarise:
> Deployed to staging. Lint passed, build succeeded (dist/ ready), and pushed to origin/staging.

If any step fails, summarise:
> Deploy aborted at [step]. [Brief reason]. Fix the issue and re-run /deploy.
