# Connect Okta

Step-by-step guide to connecting Okta to Thalian for identity and access intelligence.

---

## Prerequisites

- **Okta admin account** with permission to create applications
- **Okta domain** — your Okta org URL (e.g., `yourcompany.okta.com`)

## Create an API Services app in Okta

Thalian connects using Okta's OAuth 2.0 client credentials flow. You'll need to create a service app in Okta that grants read-only API access.

1. Sign in to your Okta admin console
2. Go to **Applications** → **Applications**
3. Click **Create App Integration**
4. Select **API Services** and click **Next**
5. Give the app a name (e.g., `Thalian`) and click **Save**

## Grant the required OAuth scopes

After creating the app:

1. Go to the **Okta API Scopes** tab on your new app
2. Grant the following scopes:

| Scope | Purpose |
|-------|---------|
| `okta.users.read` | Sync users, status, and MFA enrollment |
| `okta.apps.read` | Sync assigned applications |
| `okta.groups.read` | Sync group memberships |
| `okta.logs.read` | Read system log events |

3. Click **Grant** for each scope

## Copy your credentials

1. Go to the **General** tab of your app
2. Copy the **Client ID** from the Client Credentials section
3. Click **Generate new client secret** and copy the value — it is only shown once

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Okta** and click **Connect**
3. Enter your **Okta domain** (e.g., `yourcompany.okta.com`)
4. Paste your **Client ID** and **Client Secret**
5. Click **Connect** — Thalian validates the credentials and begins the first sync

## What Thalian syncs

- **Users** — full directory including status, last login, and profile attributes
- **Groups** — group memberships and assignments
- **MFA status** — enrolled factors per user
- **Apps** — assigned applications and provisioning status
- **System log events** — authentication events, admin actions, and policy changes

## Troubleshooting

- **Invalid credentials:** Ensure the Client ID and Secret were copied correctly and the app has not been deactivated
- **Missing data:** Confirm all four OAuth scopes have been granted on the app's Okta API Scopes tab
- **Rate limiting:** Thalian respects Okta's rate limits automatically. If syncs are slow, this may indicate heavy API usage on your Okta org

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
