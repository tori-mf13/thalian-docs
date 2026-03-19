# Connect Auvik

Step-by-step guide to connecting Auvik to Thalian for network management intelligence.

---

## Prerequisites

- **Auvik** account with API access
- A user account with the **API Access Only** role (or equivalent read-only role)

## Create an API Key in Auvik

1. Sign in to the Auvik dashboard with the account you want to use for API access
2. Click your **username** in the side navigation bar
3. Click **Generate** to create an API key
4. Click **Copy** to copy the API key — it is shown only once
5. Click **Save**

!!! warning "Key visibility"
    The API key is only shown in full once. Copy it immediately. Regenerating or revoking the key invalidates the previous one.

## Recommended Permissions

Assign the **API Access Only** role with **Read** access to the Inventory API. This lets Thalian pull device and network data without granting dashboard access or write permissions.

To configure the role: go to **Manage Users** → **Roles** → select **API Access Only** → **Edit**, then enable Read access for the Inventory API.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Auvik** and click **Connect**
3. Enter the **email address** of the Auvik API user
4. Paste the **API key**
5. Select your **Auvik region** (e.g., `us1`, `us2`, `eu1`, `au1`, `ca1`)
6. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Network devices** — routers, switches, firewalls, access points, and their firmware versions
- **Networks** — discovered networks and topology data
- **Clients** — connected clients and interface details
- **Alerts** — triggered alerts with severity and detection time

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
