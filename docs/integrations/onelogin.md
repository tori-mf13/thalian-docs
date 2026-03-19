# Connect OneLogin

Step-by-step guide to connecting OneLogin to Thalian for identity and access intelligence.

---

## Prerequisites

- **OneLogin admin account** with developer permissions
- **OneLogin subdomain** — your OneLogin org URL (e.g., `yourcompany.onelogin.com`)

## Create API Credentials in OneLogin

1. Sign in to the OneLogin admin portal
2. Go to **Developers** → **API Credentials**
3. Click **New Credential**
4. Give it a name (e.g., `Thalian Read-Only`)
5. Set the scope to **Read All**
6. Click **Save**
7. Copy the **Client ID** and **Client Secret** — the secret is only shown once

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **OneLogin** and click **Connect**
3. Enter your **OneLogin subdomain** (e.g., `yourcompany`)
4. Paste your **Client ID** and **Client Secret**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Users** — full directory including status, last login, and group memberships
- **Apps** — assigned applications and provisioning status
- **Roles** — role definitions and user-role assignments

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
