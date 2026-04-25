---
date: 2026-04-25
slug: attack-surface-grouped-findings
---

# Attack Surface Map, login geolocation, grouped findings, and Slack App Directory

New interactive threat visualization, IP-based login context, dramatically less finding noise, and Thalian now installs directly from the Slack App Directory.

<!-- more -->

## Attack Surface Map

The Causality Insights panel has a new visualization. The old card-based layout is replaced by an interactive SVG graph that draws the connections between your identity entry points, attack vectors, and the platforms they lead to — all in one view. Hover over any node for details. Root cause and systemic pattern cards are now clickable: selecting one pre-fills the AI assistant with a targeted question so you can go straight from pattern to investigation.

The attack chain card also got a complete visual redesign. The entry point avatar connects through an animated attack vector pill to a fanned list of at-risk platforms, each with an intensity-colored tick proportional to how many entitlements are exposed. More saturated = more blast radius.

## Login geolocation in finding details

Finding detail panels now show city, region, country, and ISP for login-related context — including the unmanaged access panel. Useful for spotting logins from unexpected countries or cloud-proxy exit nodes before taking action. IP geolocation is processed in-house through a Cloudflare R2 worker using MaxMind GeoLite2 databases. No customer IP address is sent to any third party.

## Grouped findings — less noise, smarter severity

Eight high-volume rules that were generating one finding per identity now emit a single grouped finding with all affected users inside. Severity scales with scope: 3+ users without a managed device escalates from high to critical; an MFA coverage gap crossing 50% escalates from high to critical automatically.

Rules now grouped:
- Active user with no device in any MDM
- Admin without MFA
- Stale admin account
- MFA coverage gap
- Password-only auth across multiple users
- Cross-platform privilege drift
- Cross-platform offboarding gap
- Cross-platform MFA gap

Finding panels with 10+ entities now have a show more / show less toggle instead of rendering an infinite list.

## Finding consolidation for shadow IT and IDP gaps

Shadow IT sensitive-scope findings and broad OAuth write-access findings now emit a single consolidated finding per workspace instead of one finding per app. 5+ apps in the same group escalates to critical. Same consolidation applies to GitHub org owners not in your IDP and GCP owner/member not-in-IDP findings.

Finding panels updated to aggregate "Authorized by" users across all apps in the group when no specific app is selected, then scope to the selected app when you click into one.

## Per-admin OAuth revoke

Admin excessive OAuth findings are now structured one per admin (not one workspace-level grouped finding), with an inline per-app revoke button in the finding panel. Revocation runs through your IDP by app name — no OAuth client ID required to be stored.

## Custom entity names in finding titles

11 per-entity rules now include the specific person's name or email directly in the finding title — e.g., "sarah@company.com has active access to 5 platforms after offboarding" instead of a generic title. Speeds up triage when scanning a long findings list.

## Slack App Directory

Thalian is now listed in the Slack App Directory. You can install the Slack integration directly without leaving Slack. The direct install URL is `app.thalian.ai/api/slack-install`.

## Security

- **HMAC key isolation** — Webhook and AI chat action HMAC keys are now domain-separated via HKDF. A key compromise in one context cannot be used in another.
- **Single-use action tokens** — HMAC confirmation tokens for AI-initiated remediation actions are now consumed on first use. Replaying a confirmation no longer works.
- **AI chat tool gating** — `trigger_sync` now requires `manage_integrations` role; `run_analysis` requires `analyze` role. These tools were previously accessible to any authenticated user.

## Fixes

- **Automation policy matching** — Automation policies were silently matching against the wrong finding scope: the engine was falling back to a category-wide match for policies with an empty rule ID list, while the UI counted violations strictly by rule ID. The two are now in sync via an explicit `match_mode` column. If you have automation policies set up, check the Policies page — violation counts may change.
- **Fleet encryption and compliance** — Encryption status and compliance were showing as "Unknown" for all Fleet-managed devices. Fixed by fetching per-host detail endpoints (the list endpoint omits this data).
- **Device OS column** — Devices table was showing a raw internal platform string (e.g., `darwin`) instead of the OS version label.
- **AI chat response length** — Long AI responses were being truncated. Max token limit raised to 4096 with pagination for responses that exceed it.
- **Finding panel "Authorized by"** — The "Authorized by" section on consolidated OAuth findings was only showing users from the first app in the group. Now aggregates correctly.

[View on GitHub](https://github.com/thalian-ai/thalian/releases/tag/v2026.04.2)
