# Changelog

Notable changes, new features, and fixes for the Thalian platform.

---

## v0.9.1 — March 19, 2026

### Added

- **Public status page** — Real-time platform health at [status.thalian.ai](https://status.thalian.ai) with incident history and email subscription for downtime alerts
- **Branded billing emails** — Custom Thalian-branded transactional emails for subscription events: welcome/payment confirmation, payment failure alerts, renewal reminders, and cancellation follow-ups (powered by Loops)
- **Layer 3 behavioral baselines** — Per-entity anomaly detection that builds individual baselines for users, devices, and apps and flags deviations from established patterns
- **Findings notification filtering** — Alert notifications now fire only on new findings; recurring open findings no longer generate repeat alerts

### Improved

- **Status page** — Incident cards now show affected services chips; uptime bars show status tooltips on hover
- **Findings page** — Each tab now includes a short descriptor explaining what the tab tracks, reducing onboarding friction
- **Causality Insights** — Redesigned compact card layout for the insights tab; remediation suggestions are now entity-specific based on the finding subject
- **Performance** — Initial app bundle reduced by 69%; database queries parallelized for faster page load
- **Auto-sync reliability** — Integrations now sync in parallel, preventing worker timeouts on workspaces with many connected platforms

### Security

- Auth guards and workspace scoping added to 7 previously unguarded API endpoints

### Changed

- Status page moved from an in-app route to a standalone Cloudflare Worker, accessible without authentication
- Stripe default customer emails replaced with branded templates matching Thalian's design system

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
- **Free, Pro, and Enterprise plans** with 14-day Pro trial for new workspaces

---

*For information on getting started with the platform, see [Getting Started](./getting-started.md).*
