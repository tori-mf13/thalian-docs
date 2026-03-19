# Connect Cisco Meraki

Step-by-step guide to connecting Cisco Meraki to Thalian for network intelligence.

---

## Prerequisites

- **Meraki Dashboard** account with API access enabled
- **Organization admin** or read-only admin role

## Enable API Access and Create a Key

1. Sign in to the Meraki Dashboard
2. Go to **Organization** → **Settings**
3. Under **Dashboard API access**, enable the API if not already enabled
4. Navigate to your **profile** (click your name in the top-right)
5. Under **API access**, click **Generate new API key**
6. Copy the API key — it is shown only once

## Recommended Permissions

The Meraki API key inherits the permissions of the dashboard account. Thalian only needs read access. A **read-only admin** role at the organization level is sufficient and recommended to limit the key's access.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Cisco Meraki** and click **Connect**
3. Paste your **API key**
4. Click **Save** — Thalian validates the key and discovers your organizations and networks

## What Thalian Syncs

- **Network devices** — access points, switches, security appliances, and their status
- **Clients** — connected clients across networks with usage data
- **VPN status** — site-to-site and client VPN connection state

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
