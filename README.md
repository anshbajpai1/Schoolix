# Schoolix

Schoolix is a school-management application for administration, academics, accounts, library operations, transport, and role-based portals. It ships as a Firebase-hosted web app and as an Android/desktop package through Capacitor and Electron.

## Local development

Install the locked dependencies, then run the app or validation checks:

```bash
npm ci
npm start
npm run validate
```

The app reads runtime configuration from `.env`. Start from [`.env.example`](.env.example) and keep real credentials out of Git.

## Build targets

| Command | Purpose |
| --- | --- |
| `npm run build:hosting` | Prepare the Firebase Hosting output in `hosting/`. |
| `npm run build:mobile` | Prepare the Capacitor web bundle in `www/`. |
| `npm run android:sync` | Build the web bundle and sync it into Android. |
| `npm run build:desktop` | Build the local Electron desktop directory. |

## Before opening a pull request

Run `npm run validate`, manually test the impacted role/page, and mention whether web, Android, or desktop release work is needed.

## Security

Do not commit API keys, service-account files, Firebase exports, Supabase exports, or build artifacts. Report security issues using [SECURITY.md](SECURITY.md).
