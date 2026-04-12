# Connect Mosyle

Step-by-step guide to connecting Mosyle to Thalian for Apple device management intelligence.

---

## Prerequisites

- **Mosyle Business or Mosyle Manager account**
- **Mosyle admin permissions** to access API settings

---

## Create an API key in Mosyle

1. Sign in to the Mosyle admin console
2. Go to **Account** → **API**
3. Enable the API if not already enabled
4. Generate a new API access token
5. Copy the token value — it will not be shown again

---

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Mosyle** and click **Connect**
3. Enter your **Mosyle account email** and **API access token**
4. Click **Save** — Thalian validates the credentials and begins the first sync

---

## What Thalian syncs

- **Apple devices** — Mac, iPhone, iPad, and Apple TV inventory with hardware model, OS version, serial number, and enrollment status
- **Compliance** — per-device compliance state based on applied profiles and policies
- **Management status** — supervised vs. unsupervised, managed vs. unmanaged indicators

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
