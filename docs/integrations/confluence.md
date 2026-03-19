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

## Requested Permissions

| Scope | Justification |
|---|---|
| `read:confluence-content.all` | Reads page metadata across all spaces for content inventory and reporting |
| `write:confluence-content` | Reserved for future Confluence page creation (e.g., auto-generated security reports) |
| `read:confluence-space.summary` | Fetches space list and summaries for the Confluence integration overview |
| `read:space:confluence` | Granular v2 API scope — required alongside the classic scope for the `/wiki/api/v2/spaces` endpoint |
| `read:page:confluence` | Granular v2 API scope — required for the `/wiki/api/v2/pages` endpoint |
| `read:content:confluence` | Granular v2 API scope — required for reading page content via the v2 API |
| `read:me` | Fetches accessible cloud resources to determine the correct cloud ID |
| `offline_access` | Standard OAuth — allows token refresh |

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
