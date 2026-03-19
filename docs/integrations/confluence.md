# Connect Confluence

Step-by-step guide to connecting Confluence to Thalian for collaboration security intelligence.

---

## Prerequisites

- **Atlassian Cloud** account with Confluence access
- **Space admin** or **site admin** permissions for OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Confluence** and click **Connect**
3. Click **Authorize with Atlassian**
4. Sign in with your Atlassian account
5. Select the **Confluence site** you want to connect
6. Review the requested permissions — Thalian requests read-only access to spaces and content metadata
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

- **Spaces** — space inventory including permissions and access levels
- **External sharing** — content shared with external users or via public links
- **Content exposure** — pages and attachments with overly broad permissions

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
