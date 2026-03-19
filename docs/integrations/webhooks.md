# Outbound Webhooks

How to configure Thalian to send finding data to external systems via outbound webhooks.

---

## Overview

Outbound webhooks let Thalian push finding notifications to any system that accepts HTTP POST requests — SIEMs, SOARs, custom dashboards, or internal tooling. Unlike other integrations, webhooks are **outbound only** and do not require Thalian to read any data from the destination.

## Use Cases

- **SIEM ingestion** — forward findings to Splunk, Elastic, Microsoft Sentinel, or any SIEM that accepts webhook input
- **SOAR playbooks** — trigger automated response workflows in Torca, Cortex XSOAR, or similar platforms when new findings are detected
- **Custom dashboards** — push finding data to internal tools or data warehouses for custom reporting
- **ChatOps** — send alerts to platforms beyond Slack and Teams (e.g., Discord, Google Chat, PagerDuty)
- **Ticketing systems** — create tickets in platforms not natively supported by Thalian

## Configure a Webhook

1. Go to **Integrations** → **Browse**
2. Find **Webhook** and click **Connect**
3. Enter the **destination URL** (must be HTTPS)
4. Optionally add a **secret** — Thalian includes this as an HMAC signature in the `X-Thalian-Signature` header so the receiving system can verify authenticity
5. Click **Save**

## Configure Alert Rules

After connecting the webhook:

1. Open the Webhook integration card in **Integrations**
2. Toggle **Alerts** on
3. Set the **severity threshold** — only findings at or above this level are sent

## Payload Format

Thalian sends a JSON payload via HTTP POST for each finding that meets your threshold. The payload includes:

- **Finding ID** and title
- **Severity** level and score
- **Affected identity** or asset
- **Platform** where the finding was detected
- **Timestamp** of detection
- **Remediation guidance** summary

## Retry Behavior

If the destination returns a non-2xx status code, Thalian retries delivery up to 3 times with exponential backoff. After all retries are exhausted, the delivery is marked as failed and visible on the integration card.

## Security

- Webhook URLs must use **HTTPS** — plain HTTP endpoints are rejected
- Use the **HMAC secret** to verify that incoming requests originate from Thalian
- No read permissions are needed — webhooks are strictly outbound

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
