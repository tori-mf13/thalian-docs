# Connect SentinelOne

Step-by-step guide to connecting SentinelOne to Thalian for endpoint security intelligence.

---

## Prerequisites

- **SentinelOne** management console access
- **API token** with read permissions at the account or site level

## Create an API Token in SentinelOne

1. Sign in to the SentinelOne management console
2. Click your **username** in the top-right corner → **My User**
3. Under **Options**, click **Generate API Token**
4. Copy the token value — it is shown only once

The token inherits the permissions of the user who generates it. A **Viewer** role is sufficient for Thalian's read-only needs.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **SentinelOne** and click **Connect**
3. Enter your **SentinelOne console URL** (e.g., `https://yourcompany.sentinelone.net`)
4. Paste your **API token**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Agents** — deployed agent inventory with OS, version, and status
- **Threats** — active and resolved threats with classification and confidence level
- **Device health** — agent health status and connectivity state

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
