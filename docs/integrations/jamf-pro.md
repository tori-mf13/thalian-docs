# Connect Jamf Pro

Step-by-step guide to connecting Jamf Pro to Thalian for Apple device management intelligence.

---

## Prerequisites

- **Jamf Pro instance** with API access enabled
- **Jamf Pro admin account** or an API-only account with read permissions

## Create API Credentials in Jamf Pro

1. Sign in to your Jamf Pro instance
2. Go to **Settings** → **System** → **API Roles and Clients**
3. Create a new **API Role** with read-only permissions for computers, mobile devices, and configuration profiles
4. Create a new **API Client** and assign the role you just created
5. Copy the **Client ID** and **Client Secret**

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Jamf Pro** and click **Connect**
3. Enter your **Jamf Pro URL** (e.g., `https://yourcompany.jamfcloud.com`)
4. Paste your **Client ID** and **Client Secret**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Mac/iOS devices** — hardware inventory, OS versions, and management status
- **Compliance** — smart group membership indicating compliance state
- **Configurations** — configuration profiles and their deployment status

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
