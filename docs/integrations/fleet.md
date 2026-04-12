# Connect Fleet

Step-by-step guide to connecting Fleet to Thalian for cross-platform endpoint intelligence.

---

## Prerequisites

- **Fleet instance** (self-hosted or Fleet Cloud) running Fleet 4.x or later
- **Fleet admin** or API access to generate an API token
- Your Fleet server URL (e.g., `https://fleet.yourcompany.com`)

---

## Create an API token in Fleet

1. Sign in to your Fleet admin console
2. Go to **Settings** → **Integrations** → **Fleet API**
3. Click **Add new API token** (or use an existing admin user's API key)
4. Give the token a descriptive name (e.g., `Thalian Read-Only`)
5. Copy the token value

Alternatively, you can use a dedicated read-only Fleet user account's API key generated via the Fleet CLI:

```
fleetctl user create --name "Thalian" --email "thalian@yourcompany.com" --global-role observer
```

---

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Fleet** and click **Connect**
3. Enter your **Fleet server URL** (including `https://`)
4. Paste your **API token**
5. Click **Save** — Thalian validates the connection and begins the first sync

---

## What Thalian syncs

- **Host inventory** — all enrolled hosts across Windows, macOS, and Linux, with hardware details, OS version, and last check-in timestamp
- **Policy results** — pass/fail status for each Fleet policy applied to each host
- **Compliance** — per-device compliance derived from policy results

---

## Troubleshooting

- **Connection refused:** Confirm your Fleet server URL is publicly reachable or that Thalian's egress IPs are allowlisted if Fleet is behind a firewall
- **Invalid token:** Ensure the token was copied without extra whitespace and has not been revoked
- **No hosts found:** The token must have at least `observer` role at the global scope to read all hosts

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
