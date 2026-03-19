# Connect CrowdStrike

Step-by-step guide to connecting CrowdStrike Falcon to Thalian for endpoint security intelligence.

---

## Prerequisites

- **CrowdStrike Falcon** account with API access
- **API client credentials** with read permissions

## Create API Credentials in CrowdStrike

1. Sign in to the CrowdStrike Falcon console
2. Go to **Support and resources** → **API Clients and Keys**
3. Click **Add new API client**
4. Give the client a name (e.g., `Thalian Read-Only`)
5. Assign the following **read-only** scopes:
   - **Hosts** — Read
   - **Detections** — Read
   - **Real time response** — Read (for containment status)
6. Click **Add** and copy the **Client ID** and **Client Secret**

!!! warning "Secret visibility"
    The client secret is only shown once. Copy it immediately.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **CrowdStrike** and click **Connect**
3. Select your **CrowdStrike cloud region** (US-1, US-2, EU-1, or US-GOV-1)
4. Paste your **Client ID** and **Client Secret**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Endpoints** — host inventory including OS, agent version, and last-seen timestamps
- **Detections** — active and resolved detections with severity and tactic details
- **Containment status** — network containment state per host

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
