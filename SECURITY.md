# Security policy

## Reporting a vulnerability

Please do not open a public issue for a suspected vulnerability. Use GitHub's private vulnerability-reporting flow for this repository, or contact the repository owner directly with:

- a clear description of the affected feature;
- steps to reproduce the issue safely;
- potential impact; and
- any suggested remediation.

We will acknowledge reports as soon as practical, investigate privately, and coordinate a fix before public disclosure.

## Handling secrets

Schoolix configuration may contain Firebase, Supabase, payment, and service-account credentials. Never commit production credentials, exports, signing files, or generated configuration. If a credential is exposed, revoke or rotate it immediately and remove it from the affected platform's environment settings.
