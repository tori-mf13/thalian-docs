# Connect SimpleMDM

Step-by-step guide to connecting SimpleMDM to Thalian for Apple device management intelligence.

---

## Prerequisites

- **SimpleMDM account** with admin access
- Permission to generate API keys in SimpleMDM settings

---

## Create an API key in SimpleMDM

1. Sign in to the SimpleMDM admin console
2. Go to **Account** → **API** (or **Settings** → **API Keys**)
3. Click **Create API Key**
4. Give the key a name (e.g., `Thalian`)
5. Copy the key value — it will not be shown again

The API key has read access to all devices and profiles by default. No additional configuration is needed.

---

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **SimpleMDM** and click **Connect**
3. Paste your **API key**
4. Click **Save** — Thalian validates the credentials and begins the first sync

---

## What Thalian syncs

- **Apple devices** — Mac, iPhone, iPad inventory with model, OS version, serial number, and enrollment date
- **Assigned profiles** — management profiles applied to each device
- **Compliance** — per-device compliance state based on assigned profiles and last check-in status

---

## Troubleshooting

- **Invalid key:** Ensure the API key was copied correctly and has not been revoked in SimpleMDM settings
- **No devices found:** Confirm your SimpleMDM account has enrolled devices and the API key has access to the device list

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
