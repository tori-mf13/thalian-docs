# Connect Omnissa Workspace ONE

Step-by-step guide to connecting Omnissa Workspace ONE to Thalian for cross-platform device management intelligence.

---

## Prerequisites

- **Workspace ONE UEM** environment (on-premises or cloud-hosted)
- **Workspace ONE admin account** with API access enabled
- Your Workspace ONE API URL (e.g., `https://as###.awmdm.com`)

---

## Enable API access in Workspace ONE

1. Sign in to the Workspace ONE UEM console as an admin
2. Go to **Groups & Settings** → **All Settings** → **System** → **Advanced** → **API** → **REST API**
3. Ensure **Enable API Access** is turned on
4. Note your **API URL** — shown at the top of the REST API settings page

---

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Omnissa Workspace ONE** and click **Connect**
3. Enter your **API URL** (e.g., `https://as###.awmdm.com`)
4. Enter your **admin username** and **password** (used for Basic auth against the REST API)
5. Enter your **tenant code** if prompted (visible in the UEM console URL path)
6. Click **Save** — Thalian validates the credentials and begins the first sync

---

## What Thalian syncs

- **Cross-platform devices** — Windows, macOS, iOS, Android, and ChromeOS device inventory with OS version, model, and enrollment status
- **Compliance status** — per-device compliance state from Workspace ONE compliance policies
- **Last check-in** — when each device last communicated with the Workspace ONE server

---

## Troubleshooting

- **Authentication error:** Ensure the username and password are for a Workspace ONE admin account (not an Active Directory passthrough account) and that REST API access is enabled
- **No devices found:** Confirm the admin account has access to the organization group where devices are enrolled
- **API URL incorrect:** The URL should match what's shown in UEM under REST API settings — do not include a trailing slash

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
