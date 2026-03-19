# Connect Freshservice

Step-by-step guide to connecting Freshservice to Thalian for ITSM intelligence and alert delivery.

---

## Prerequisites

- **Freshservice account** with API access enabled
- **Freshservice admin** or agent account with API key access

## Find Your API Key in Freshservice

1. Sign in to your Freshservice portal
2. Click your **profile icon** in the top-right corner
3. Go to **Profile Settings**
4. Your **API key** is displayed on the right side of the page
5. Copy the API key

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Freshservice** and click **Connect**
3. Enter your **Freshservice domain** (e.g., `yourcompany.freshservice.com`)
4. Paste your **API key**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Tickets** — service requests and incidents with status, priority, and resolution data
- **Agents** — agent directory and group assignments
- **Assets** — IT asset inventory for cross-referencing with endpoint data

## Alert Rules

When alert rules are enabled, Thalian can automatically create tickets for new findings above your configured severity threshold.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
