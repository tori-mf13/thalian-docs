# Connect Kandji

Step-by-step guide to connecting Kandji to Thalian for Apple device management intelligence.

---

## Prerequisites

- **Kandji account** with API access enabled
- **Kandji admin permissions** to generate API tokens

## Create an API Token in Kandji

1. Sign in to the Kandji web app
2. Go to **Settings** → **Access** → **API Token**
3. Click **Add Token**
4. Give the token a name (e.g., `Thalian Read-Only`)
5. Set permissions to read-only access for devices and blueprints
6. Click **Save** and copy the token value

## Recommended Permissions

When creating the API token, grant read-only access to the following:

- **Device list** — required to sync the full Apple device inventory
- **Device details** — required to read hardware, OS, and blueprint data
- **Blueprints** — required to read blueprint assignments and library item status

No write permissions are needed.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Kandji** and click **Connect**
3. Enter your **Kandji subdomain** (e.g., `yourcompany.kandji.io`)
4. Paste your **API token**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Apple devices** — Mac, iPhone, iPad, and Apple TV inventory with hardware and OS details
- **Blueprints** — blueprint assignments and library item status
- **Compliance** — per-device compliance state based on blueprint parameters

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
