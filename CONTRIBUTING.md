# Contributing to Schoolix

## Working safely

1. Begin from an up-to-date `main` branch.
2. Keep each change focused on one outcome.
3. Do not include generated folders (`www/`, `hosting/`, desktop bundles) unless the change specifically requires a reviewed artifact.
4. Never add real credentials or student/staff data.

## Testing

Run the validation suite before proposing a change:

```bash
npm run validate
```

Then manually exercise the relevant role and workflow, especially authentication, fees, attendance, and any release-specific integration.

## Commit messages

Use short, imperative summaries such as `Fix attendance export date handling`. Explain release impact in the pull request when a change affects Firebase hosting, Android, or the desktop app.
