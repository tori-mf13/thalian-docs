# Changelog

Notable changes, new features, and fixes for the Thalian platform.

---

## March 20, 2026

### New Features

- **In-app feedback form** — A "Give feedback" option is now available in the bottom-left user menu. Submit bug reports, feature requests, or general feedback without leaving the app.

### Improvements

- **AI chat context — remediation history and prior assessments** — The AI assistant now has full visibility into remediation actions taken in the last 30 days, including pending approvals, completed actions, and Claude's prior reasoning from AI-generated assessments. If actions are awaiting approval, the assistant will proactively surface them.
- **AI chat context — richer entity data** — Findings in the AI prompt are now explicitly linked to the named user or app they affect, rather than relying on IDs. Device detail now includes OS platform and version. Application listings include category. Admin account lines include department where available.
- **AI chat context — finding descriptions** — The assistant now receives the full description of each open finding (why the finding exists and what makes it risky), enabling it to explain findings in plain language rather than just naming them.
- **AI chat context — stale access analysis** — The assistant can now identify entitlements where the app hasn't been used in 90+ days, surfacing which apps have the most stale seats and which users have access they never use.
- **AI chat — what-if simulation tool** — The assistant can now answer "what would happen if I suspended this user?" or "how many findings would close if I revoked this access?" by running a live simulation against real workspace data before any action is taken.

### Fixes

- **Slack alert deduplication fixed — alerts no longer fire on every sync** — Two compounding bugs were causing alert rules to re-fire on every sync run. First, the dedup key used internal Supabase UUIDs as entity identifiers; since email-discovered apps were being deleted and re-inserted on each sync, they received new UUIDs each time, making every finding appear "new" and bypassing the dedup log. Second, the Google Workspace email app sync was deleting all email-discovered apps on every run, not just stale ones, causing apps to disappear and reappear with new IDs every other sync. Both are now fixed: dedup keys use stable external identifiers (OAuth client IDs, external system IDs, names) and the email app sync only removes apps that are genuinely absent from the current scan.
- **Integration sync failures now surface on the status page** — A sync error in any connected integration (Okta, Google Workspace, etc.) now correctly flips the integration's status to `error`, which the status page health check reads. Previously, failed syncs wrote a `sync_error` message but left the status field as `connected`, so the status page remained green. In addition, integrations that haven't synced in over 10 hours are now flagged as degraded even if no explicit error was recorded — catching silent failures where the sync process dies without writing an error.

---

## v0.9.2 — March 19, 2026

### New Features

- **AI-reasoned remediation** — For entities with multiple overlapping findings, ask Claude to analyze all open risks in context and propose a sequenced action plan with reasoning. Available from the Remediation page under "AI Recommendations" and from Identities via a one-click deep-link
- **AI vs. Auto badge differentiation** — Remediation action log now distinguishes Claude-reasoned plans ("AI" badge, violet) from deterministic rule-based automation ("Auto" badge, teal)
- **AI reasoning in approval cards** — When reviewing Claude-proposed actions, the approval card now shows Claude's assessment — what the situation is, what risk it poses, and why the recommended actions are the right response

---

## v0.9.1 — March 19, 2026

### Added

- **Public status page** — Real-time platform health at [status.thalian.ai](https://status.thalian.ai) with incident history and email subscription for downtime alerts
- **Layer 3 behavioral baselines** — Per-entity anomaly detection that builds individual baselines for users, devices, and apps and flags deviations from established patterns
- **Findings notification filtering** — Alert notifications now fire only on new findings; recurring open findings no longer generate repeat alerts

### Improved

- **Status page** — Per-service 90-day uptime bars now visible under each service row without expanding; incident cards show affected services chips; uptime bar tooltips include status label; social sharing previews (OG/Twitter cards) now supported
- **Findings page** — Each tab now includes a short descriptor explaining what the tab tracks, reducing onboarding friction
- **Causality Insights** — Redesigned compact card layout for the insights tab; remediation suggestions are now entity-specific based on the finding subject
- **Performance** — Initial app bundle reduced by 69%; database queries parallelized for faster page load
- **Auto-sync reliability** — Integrations now sync in parallel, preventing worker timeouts on workspaces with many connected platforms

### Security

- Auth guards and workspace scoping added to 7 previously unguarded API endpoints

### Changed

- Status page moved from an in-app route to a standalone Cloudflare Worker, accessible without authentication

---

## March 2026

### New Features

- **Impact Analysis page** — Model remediation scenarios before executing them with the scenario builder. Simulate "what if?" actions and see projected risk score changes, findings that would close, and downstream effects
- **KPI Dashboard and Goals Tracker** — Set measurable security goals (OKRs) with target values and deadlines. Track velocity, get AI-recommended actions, and monitor progress across 14 metrics
- **Policy auto-generation** — Auto-generated security policy drafts based on your connected integrations and active findings. Review, edit, approve, and export as PDF
- **Causality Insights** — Cross-platform finding correlation that surfaces connections between related findings sharing the same affected entity
- **Agentic remediation** — Automated remediation with three tiers (`auto_execute`, `auto_queue`, `never`) for Pro and Enterprise workspaces
- **Drift snapshots** — Point-in-time posture snapshots captured after each analysis run, powering trend charts across the Reports page

### Integrations

- Added **Cisco Meraki** — Network devices, clients, and VPN status
- Added **Confluence** — Spaces, external sharing, and content exposure
- Added **SharePoint** — Sites, external sharing, and document permissions
- Added **Freshservice** — Tickets, agents, and assets
- Added **Zendesk** — Tickets, users, and organizations
- 24 platforms now supported across 7 categories

### Improvements

- **What-if simulation** on finding detail panels — Preview impact before taking remediation action
- **Audit log export** — Download the full audit log as JSON for SIEM integration
- **Workspace export** — Export all workspace data as JSON
- **IP allowlisting** — Restrict API access to approved IP addresses or CIDR ranges
- **Session timeout options** — Configurable session durations (1h, 4h, 8h, 24h, 72h)

---

## February 2026

### New Features

- **AI Brief** — AI-generated natural language summary of your workspace's security posture, available on the Dashboard and Reports pages
- **Remediation approval workflow** — Agent-initiated actions on high/critical findings require Security Analyst approval
- **Sync events log** — View all data changes (created, updated, deleted) detected during integration syncs

### Integrations

- Added **SentinelOne** — Agents, threats, and device health
- Added **Hexnode** — Cross-platform devices and policies
- Added **Jira Service Management** — Service requests, agents, and queues

### Improvements

- **MFA enforcement** — Workspace admins can now require TOTP-based MFA for all members
- **MTTR tracking** — Mean Time to Remediate metrics by severity, with trend charts

---

## January 2026

### Launch

- **Thalian platform launch** with support for 15 initial integrations
- **79 analysis rules** across 7 categories: Identity Security, Shadow IT, Compound Risk, Device Posture, License Waste, Drift Signal, Access Hygiene
- **25 remediation action types** across identity, application, and device categories
- **6 RBAC roles** with enforced permission hierarchy
- **AES-256-GCM encryption** for all integration credentials
- **Immutable audit log** with SHA-256 integrity hashing
- **Free, Pro, and Enterprise plans** with 30-day Pro trial for new workspaces

---

*For information on getting started with the platform, see [Getting Started](./getting-started.md).*
