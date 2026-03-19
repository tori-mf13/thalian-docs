# Connect Zendesk

Step-by-step guide to connecting Zendesk to Thalian for ITSM intelligence and alert delivery.

---

## Prerequisites

- **Zendesk** account with admin access
- **Zendesk subdomain** — your Zendesk URL (e.g., `yourcompany.zendesk.com`)

## Create an API Token in Zendesk

1. Sign in to the Zendesk admin center
2. Go to **Apps and integrations** → **Zendesk API**
3. On the **Settings** tab, enable **Token Access** if not already enabled
4. Click **Add API token**
5. Give the token a description (e.g., `Thalian Read-Only`)
6. Copy the token value — it is shown only once
7. Click **Save**

## Recommended Permissions

The Zendesk API token inherits the permissions of the admin account used to authenticate. Thalian needs:

- **Read access** to tickets, users, and organizations for sync
- **Write access** to tickets only if alert rules are enabled (to auto-create tickets for findings)

An **Admin** account is recommended to ensure access to all ticket data and the user directory.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Zendesk** and click **Connect**
3. Enter your **Zendesk subdomain** (e.g., `yourcompany`)
4. Enter the **email address** associated with your Zendesk admin account
5. Paste your **API token**
6. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Tickets** — support tickets with status, priority, assignee, and tags
- **Users** — Zendesk user and agent directory
- **Organizations** — organization records and memberships

## Alert Rules

When alert rules are enabled, Thalian can automatically create tickets for new findings above your configured severity threshold.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
