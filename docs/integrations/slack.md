# Connect Slack

Step-by-step guide to connecting Slack to Thalian for identity sync and finding alert delivery.

---

## Prerequisites

- **Slack workspace** where you want to receive alerts
- **Slack admin** or sufficient permissions to install apps in the workspace

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Slack** and click **Connect**
3. Click **Add to Slack**
4. Sign in to your Slack workspace if prompted
5. Review the requested permissions — Thalian requests access to post messages to channels
6. Select the **channel** where you want to receive alerts (or allow Thalian to post to any channel you later configure)
7. Click **Allow**
8. You'll be redirected back to Thalian — the integration is now connected

## Requested Permissions

| Scope | Justification |
|---|---|
| `chat:write` | Delivers security alert and remediation notifications to designated Slack channels |
| `channels:read` | Lists public channels so admins can pick which channel receives alerts |
| `users:read` | Fetches workspace member list for identity sync (correlating Slack accounts to other platforms) |
| `users:read.email` | Reads email addresses from the users list — required to match Slack users to Entra ID / Google identities |

!!! warning "Audit logs require Enterprise Grid"
    The `auditlogs:read` scope is only available on Slack Enterprise Grid plans. Standard Slack workspaces do not support this scope. See the [Slack Enterprise Grid](#slack-enterprise-grid) section below for details.

## Configure Alert Delivery

After connecting Slack:

1. Open the Slack integration card in **Integrations**
2. Toggle **Alerts** on
3. Select the **channel** for finding notifications
4. Set the **severity threshold** — only findings at or above this level are sent

Thalian sends formatted Slack messages for each new finding that meets your threshold.

## What Thalian Uses Slack For

- **Identity sync** — Thalian reads the workspace member list and email addresses to correlate Slack accounts with identities from other platforms
- **Alert delivery** — when a new finding meets your severity threshold, Thalian posts a notification to your configured channel
- **Audit logs** — on Enterprise Grid workspaces, Thalian ingests audit logs for suspicious activity detection

Thalian does not read or sync messages, files, or channel history.

---

## Slack Enterprise Grid

If your organization uses **Slack Enterprise Grid**, connect the **Slack Enterprise Grid** integration (listed separately in the Integrations browser) instead of the standard Slack integration.

Enterprise Grid unlocks two capabilities that are not available on standard Slack:

- **Audit log ingestion** — `auditlogs:read` is an Enterprise Grid-only scope. Thalian ingests organization-wide audit events to detect suspicious activity patterns across your entire Slack grid
- **User deactivation** — Thalian can deactivate Slack users directly via the `admin.users.setInactive` API, which requires the `admin.users:write` scope. Standard Slack has no user deactivation API

### Connect Slack Enterprise Grid

1. Go to **Integrations** → **Browse**
2. Find **Slack Enterprise Grid** (separate from the standard Slack entry) and click **Connect**
3. Authorize the connection using an org-level admin account — grid-level permissions are required
4. Review the requested scopes — these include `auditlogs:read` and `admin.users:write` in addition to the standard Slack scopes
5. Click **Allow**

If you connect standard Slack first and later upgrade to Enterprise Grid, connect the Slack Enterprise Grid integration separately. Both can coexist — standard Slack for individual workspaces, Enterprise Grid for the org-level audit feed.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
