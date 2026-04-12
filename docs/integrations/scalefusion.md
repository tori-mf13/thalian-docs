# Connect Scalefusion

Step-by-step guide to connecting Scalefusion to Thalian for cross-platform device management intelligence.

---

## Prerequisites

- **Scalefusion account** with admin access
- Permission to generate API keys in Scalefusion settings

---

## Create an API key in Scalefusion

1. Sign in to the Scalefusion dashboard
2. Go to **Settings** → **Developers** → **API Keys**
3. Click **Generate New API Key**
4. Give the key a name (e.g., `Thalian`)
5. Copy the API key value — it will not be shown again

---

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Scalefusion** and click **Connect**
3. Paste your **API key**
4. Click **Save** — Thalian validates the credentials and begins the first sync

---

## What Thalian syncs

- **Cross-platform devices** — Windows, macOS, iOS, and Android device inventory with model, OS version, and enrollment status
- **Applied policies** — device profiles and policy assignments
- **Compliance** — per-device compliance state based on applied policies and last check-in

---

## Troubleshooting

- **Invalid key:** Ensure the API key was copied correctly and has not been revoked in Scalefusion settings
- **No devices found:** Confirm devices are enrolled in your Scalefusion account and the API key has read access to the device list

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
