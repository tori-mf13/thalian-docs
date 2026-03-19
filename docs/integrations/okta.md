# Connect Okta

Step-by-step guide to connecting Okta to Thalian for identity and access intelligence.

---

## Prerequisites

- **Okta admin account** with permissions to create API tokens
- **Okta domain** — your Okta org URL (e.g., `yourcompany.okta.com`)

## Create an API Token in Okta

1. Sign in to your Okta admin console
2. Go to **Security** → **API** → **Tokens**
3. Click **Create Token**
4. Give the token a descriptive name (e.g., `Thalian Read-Only`)
5. Copy the token value — it is only shown once

!!! warning "Token permissions"
    The token inherits the permissions of the admin who creates it. Use a read-only admin account where possible.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Okta** and click **Connect**
3. Enter your **Okta domain** (e.g., `yourcompany.okta.com`)
4. Paste your **API token**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Users** — full directory including status, last login, and profile attributes
- **Groups** — group memberships and assignments
- **MFA status** — enrolled factors per user
- **Apps** — assigned applications and provisioning status
- **System log events** — authentication events, admin actions, and policy changes

## Troubleshooting

- **Invalid token:** Ensure the token was copied correctly and has not been revoked in Okta
- **Missing data:** The API token must belong to an admin with sufficient read permissions across users, groups, and apps
- **Rate limiting:** Thalian respects Okta's rate limits automatically. If syncs are slow, this may indicate heavy API usage on your Okta org

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
