# Connect Slack

Step-by-step guide to connecting Slack to Thalian for finding alert delivery.

---

## Prerequisites

- **Slack workspace** where you want to receive alerts
- **Slack admin** or sufficient permissions to install apps in the workspace

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Slack** and click **Connect**
3. Click **Add to Slack**
4. Sign in to your Slack workspace if prompted
5. Review the requested permissions — Thalian requests access to post messages to channels
6. Select the **channel** where you want to receive alerts (or allow Thalian to post to any channel you later configure)
7. Click **Allow**
8. You'll be redirected back to Thalian — the integration is now connected

## Configure Alert Delivery

After connecting Slack:

1. Open the Slack integration card in **Integrations**
2. Toggle **Alerts** on
3. Select the **channel** for finding notifications
4. Set the **severity threshold** — only findings at or above this level are sent

Thalian sends formatted Slack messages for each new finding that meets your threshold.

## What Thalian Uses Slack For

Slack is used exclusively for **alert delivery**. Thalian does not read or sync messages, files, or user data from Slack. When a new finding is generated that meets your severity threshold, Thalian posts a notification to your configured channel.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
