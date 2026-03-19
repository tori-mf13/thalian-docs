# Connect Google Workspace

Step-by-step guide to connecting Google Workspace to Thalian for identity and access intelligence.

---

## Prerequisites

- **Google Workspace** account (Business, Enterprise, or Education edition)
- **Super Admin** role to authorize the OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Google Workspace** and click **Connect**
3. Click **Authorize with Google**
4. Sign in with your Google Workspace super admin account
5. Review the requested permissions — Thalian requests read-only scopes for directory, audit, and app data
6. Click **Allow** to grant consent
7. You'll be redirected back to Thalian — the integration is now connected

### Domain-Wide Delegation

Thalian does not require domain-wide delegation. The OAuth consent flow grants the necessary read-only scopes directly.

## What Thalian Syncs

- **Users** — full directory including status, last login, and organizational unit
- **Groups** — group memberships and group settings
- **OAuth apps** — third-party apps with access to your domain
- **Gmail app discovery** — connected apps and mail delegation settings
- **Audit events** — admin activity, login events, and token grants

## Troubleshooting

- **Insufficient permissions:** The authorizing account must have the Super Admin role. Delegated admins may not have access to all required APIs
- **OAuth app blocked:** If your domain restricts third-party OAuth apps, you may need to allowlist Thalian in **Security** → **API controls** → **App access control**

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
