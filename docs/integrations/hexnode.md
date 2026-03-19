# Connect Hexnode

Step-by-step guide to connecting Hexnode to Thalian for cross-platform device management intelligence.

---

## Prerequisites

- **Hexnode UEM account** with API access enabled
- **Hexnode admin permissions** to generate API keys

## Create an API Key in Hexnode

1. Sign in to the Hexnode admin console
2. Go to **Admin** → **API**
3. Enable API access if not already enabled
4. Click **Generate API Key**
5. Copy the API key value

## Recommended Permissions

The Hexnode API key inherits the permissions of the admin account. Thalian only needs read access to:

- **Devices** — device inventory across all platforms
- **Policies** — applied policies and compliance state

Use an admin account with read-only access where possible. No write permissions are needed.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Hexnode** and click **Connect**
3. Enter your **Hexnode portal URL** (e.g., `yourcompany.hexnodemdm.com`)
4. Paste your **API key**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Cross-platform devices** — Windows, macOS, iOS, Android, and tvOS device inventory
- **Policies** — applied policies and their compliance state per device

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
