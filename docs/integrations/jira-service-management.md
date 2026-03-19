# Connect Jira Service Management

Step-by-step guide to connecting Jira Service Management to Thalian for ITSM intelligence and alert delivery.

---

## Prerequisites

- **Atlassian Cloud** account with Jira Service Management access
- **Project admin** or **site admin** permissions for OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Jira Service Management** and click **Connect**
3. Click **Authorize with Atlassian**
4. Sign in with your Atlassian account
5. Select the **Jira site** you want to connect
6. Review the requested permissions — Thalian requests read access plus write access for creating service requests when alert rules are configured
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

- **Service requests** — tickets across service desks with status and SLA data
- **Agents** — service desk agent directory
- **Queues** — queue configurations and assignments

## Alert Rules

When alert rules are enabled, Thalian can automatically create service requests for new findings above your configured severity threshold.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
