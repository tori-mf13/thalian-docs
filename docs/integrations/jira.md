# Connect Jira

Step-by-step guide to connecting Jira to Thalian for issue tracking and alert delivery.

---

## Prerequisites

- **Atlassian Cloud** account with Jira access
- **Project admin** or **site admin** permissions for OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Jira** and click **Connect**
3. Click **Authorize with Atlassian**
4. Sign in with your Atlassian account
5. Select the **Jira site** you want to connect
6. Review the requested permissions — Thalian requests read-only access plus write access for creating issues when alert rules are configured
7. Click **Accept** to grant consent
8. You'll be redirected back to Thalian — the integration is now connected

## Alternative: API Token

If your organization restricts OAuth:

1. Go to [id.atlassian.com](https://id.atlassian.com) → **Security** → **API tokens**
2. Click **Create API token** and copy the value
3. In Thalian, select the **API** connection method
4. Enter your **Atlassian email**, **API token**, and **site URL** (e.g., `yourcompany.atlassian.net`)
5. Click **Save**

## What Thalian Syncs

- **Issues** — issues across projects with status, assignee, and priority
- **Users** — Jira user directory for cross-referencing with identity data
- **Service desk tickets** — if Jira Service Management is part of the same site

## Alert Rules

When alert rules are enabled, Thalian can automatically create Jira issues for new findings above your configured severity threshold.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
