# Connect ServiceNow

Step-by-step guide to connecting ServiceNow to Thalian for ITSM intelligence and alert delivery.

---

## Prerequisites

- **ServiceNow instance** with REST API access enabled
- **ServiceNow user account** with the `itil` and `rest_api_explorer` roles (or equivalent read access)

## Create API Credentials in ServiceNow

1. Sign in to your ServiceNow instance as an admin
2. Go to **System OAuth** → **Application Registry**
3. Click **New** → **Create an OAuth API endpoint for external clients**
4. Give the application a name (e.g., `Thalian Integration`)
5. Copy the **Client ID** and **Client Secret**
6. Ensure the user account that Thalian will authenticate with has read access to the `incident`, `sys_user`, and `cmdb_ci` tables

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **ServiceNow** and click **Connect**
3. Enter your **ServiceNow instance URL** (e.g., `yourcompany.service-now.com`)
4. Paste your **Client ID**, **Client Secret**, and the **username/password** for the API user
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Incidents** — incident records with state, priority, and assignment details
- **Users** — ServiceNow user directory for cross-referencing with identity data
- **CMDB items** — configuration items from the CMDB for asset correlation

## Alert Rules

When alert rules are enabled, Thalian can automatically create incidents for new findings above your configured severity threshold.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
