# Changelog

Notable changes, new features, and fixes for the Thalian platform.

---

## March 29, 2026

### Integrations

- **Salesforce** — Connect Salesforce to detect CRM access gaps between your Salesforce org and your corporate identity provider. Thalian syncs all active and inactive Salesforce users and cross-references against Okta, Entra ID, Google Workspace, JumpCloud, and OneLogin. Fires four new findings: Salesforce admin not in IDP (critical), Salesforce user not in IDP (high), stale Salesforce user whose IDP account is suspended or deprovisioned but CRM access remains active (high), and connected app authorized by an unknown user outside the IDP (medium). Salesforce is read-only — Thalian uses the `api refresh_token offline_access id` OAuth scopes to sync users and OAuth grants. Auth uses a Salesforce Connected App with an OAuth flow. No write permissions are requested or required.

### Improvements

- **Slack alerts: Dismiss and Snooze from Slack** — Security alerts sent to Slack now include Dismiss and Snooze 7d buttons directly on every alert card. Clicking Dismiss marks the finding as dismissed; Snooze silences it for 7 days. Both actions update the original Slack message in place with a confirmation line (who took the action, when). All actions are signature-verified and written to the immutable audit log — same security model as the existing Approve Remediation button.

- **Okta: upgraded to OAuth 2.0 client credentials** — Okta sync and all 7 Okta remediation functions now authenticate using OAuth client credentials instead of a static SSWS API token. If you have Okta connected, you'll need to reconnect it with your Okta Client ID and Client Secret. The new flow is more secure, token rotation is handled automatically, and it removes the need to manage long-lived API tokens.

---

## March 28, 2026

### Integrations

- **AWS IAM** — Connect AWS Identity and Access Management to detect IAM users that exist outside your corporate IDP lifecycle controls. Thalian syncs all IAM users via `GetAccountAuthorizationDetails`, detects admin-level accounts (AdministratorAccess / PowerUserAccess) with no matching IDP identity, IAM users without MFA enrolled, and stale IAM users whose IDP account has been suspended or deprovisioned. AWS IAM does not auto-sync with Okta, Entra, or any other directory — credentials persist after offboarding until explicitly deleted. Auth uses Access Key ID + Secret Access Key, no OAuth required.

- **GCP IAM** — Connect Google Cloud Platform to detect IAM access gaps between your GCP projects and your corporate identity provider. Thalian maps every human member across all your GCP projects and cross-references against Okta, Entra ID, Google Workspace, JumpCloud, and OneLogin. Fires four new findings: GCP project owner not in IDP (critical), GCP member not in IDP (high), public IAM binding via `allUsers` or `allAuthenticatedUsers` (critical), and stale IAM binding for a suspended or deprovisioned user (high). GCP IAM does not auto-sync with corporate directories — access must be removed from IAM policies separately when employees leave. Thalian now surfaces exactly which accounts are falling through the gap.

### New Features

- **Access review campaigns** — IT and security teams can now run structured user access certification campaigns directly in Thalian. Create a campaign, scope it by department or application, and work through a paginated list of entitlements — approving access, revoking it, or granting a time-limited exception. Revoke decisions automatically open an ITSM ticket in Jira, ServiceNow, Freshservice, or Zendesk. Completed campaigns export to CSV as audit evidence for SOC 2 (CC6.3), ISO 27001, and HIPAA reviews. A sidebar badge shows pending items. The AI is aware of campaign status and can answer questions like "how many items are still pending in my Q1 review?"

- **Claude-driven agentic remediation planner** — After every sync, Claude Sonnet now reviews all new findings and decides which ones need action, what action to take, and why. Queued actions in the Remediation page now include a "Claude's reasoning" block explaining the recommendation — e.g., "This account hasn't logged into the IDP in 47 days but retains admin roles in Salesforce and GitHub. Suspending reduces blast radius while the offboarding gap is investigated." The planner sequences actions correctly (root cause first), groups multi-finding actions on the same identity, and skips findings it judges low-priority or already handled.

---

## March 26, 2026

### New Features

- **"Since your last session" AI brief** — The dashboard AI brief now opens with what changed since you last logged in. "Since yesterday, 2 new findings surfaced — the most urgent is..." Makes every login feel personalized instead of seeing the same static posture summary.

- **Cross-platform perspective view on findings** — Expanding a cross-platform finding now shows a side-by-side "What each tool sees" breakdown. Each connected platform's view is shown alongside what Thalian sees by joining them — making it immediately obvious why the finding is invisible in any single tool.

- **Live cost counter on integration discovery** — When connecting a new integration that reveals license waste findings, the discovery stream animates the cost counting up as findings are scored. Turns abstract waste into a visceral dollar amount.

- **Drift velocity projection** — Posture sparklines on the Reports page now show a dashed forward projection computed via linear regression on recent data points. Each metric shows where it's heading (e.g., "→92%") alongside the historical delta, giving early warning before thresholds are breached.

- **AI chat contextual actions** — When the AI mentions a high-severity finding about a specific person or device, it now notes available remediation actions: "You can suspend her in Okta directly from here if needed." The AI only offers when the finding is critical/high, the entity is specific, and the platform supports the action.

- **Behavioral anomaly detection** — New analysis rules detect unusual login patterns, off-hours access spikes, and sudden app access changes by comparing against per-user behavioral baselines. Fires when current behavior exceeds 2× the historical norm.

- **7 new cross-platform compound rules** — New findings that require 3+ connected data sources to detect, including: terminated employee with dual exfiltration paths (Slack + GitHub), admin on compromised device with active EDR threat, dormant account with active OAuth abuse, and coordinated multi-platform admin actions within 30 minutes.

- **Integration discovery reveal** — After connecting your 2nd or later integration, a dedicated interstitial shows the cross-platform findings that only Thalian can see. Displays the pipeline visualization (e.g., "Okta + Google Workspace → detected by Thalian") and lists the specific findings that are invisible in any single tool.

- **Shadow admin detection** — New rule identifies users who are standard users in the identity provider but hold admin roles in 3+ connected SaaS apps. These "effective admins" bypass IDP-level MFA and session controls — Thalian is the only tool that can see the privilege gap.

- **Benchmark SaaS pricing** — License waste findings now estimate cost impact using industry-standard per-user pricing for 40+ common SaaS apps. The dashboard cost banner works on day 1 without requiring contract uploads.

- **Cross-platform badge on findings** — Findings generated by joining data from multiple platforms now show a teal badge with the contributing platform names (e.g., "Okta + Slack"). Applied retroactively to all existing cross-platform rules, not just new compound rules.

### Improvements

- **Teams alerts: "Approve in Thalian" button** — Security finding cards sent to Microsoft Teams now include a green "Approve in Thalian" button for approvable actions (suspend user, revoke access, block app, contain host, etc.). Clicking it opens the Remediation page filtered to that exact finding so you can approve with one click.

- **Findings page streamlined** — Value badges consolidated: cost estimate ($X/yr) shown when available, risk impact (−N pts) as fallback — never both. Sort buttons merged into single "Sort: value". Type filter removed (rarely used). Net result: cleaner rows, fewer buttons.

- **Entity detail panel tightened** — Data Sources chips hidden when attack chain is visible (redundant). Finding count removed from header meta line (already in section header). AI dossier hidden when attack chain narrative exists (attack chain is more structured).

- **Remediation cards collapsed by default** — Approval cards now show just the action label + approve/deny buttons without expanding. Click to see full plan details. Reduces visual noise when reviewing a queue of pending actions.

- **Hourly auto-sync** — Connected integrations now sync every hour (previously every 6 hours). Findings, drift snapshots, and remediation queues update more frequently.

### Fixes

- **Google OAuth app deduplication** — OAuth apps discovered through Google Workspace sync are now deduplicated by normalized name, preventing duplicate entries for apps with slight naming variations.

- **Scoring consistency** — All scoring imports cleaned up to use a single source of truth. Agentic plan endpoint and cron schedules updated to match.

---

## March 25, 2026

### New Features

- **Three new cross-platform drift signal rules** — The intelligence engine now detects three additional trend-level findings that require data from multiple platform types simultaneously:
  - **SSO coverage declining** — Fires when the proportion of apps authenticating via SSO is trending downward over time. Includes a breach date projection and lists the top non-SSO apps. Requires an IDP and app discovery data.
  - **Termination-to-access-removal lag growing** — Measures the average time between an employee's HR termination date and their IDP account suspension across recent offboardings. Fires when the lag exceeds 2 days across 3+ offboarding events, and flags whether the lag is getting worse over time. Also surfaces any terminated employees who still have an enrolled device. Requires HR (Rippling or BambooHR) and an IDP; MDM data is incorporated when available.
  - **Ghost identity growth** — Detects users being added to SaaS tools (Slack, GitHub, Jira, etc.) without a corresponding account in any connected IDP. Fires when 3 or more such users appear in the last 60 days, or when the rate is accelerating. Requires an IDP and at least 2 connected SaaS platforms.

- **Automatic remediation now fires after every sync** — Workspaces with auto-remediation enabled will now have eligible findings automatically actioned immediately after each scheduled sync (every 6 hours and at 8am daily). Safe actions (create ticket, notify user, sanction app) execute automatically; higher-risk actions (suspend user, revoke OAuth token, block app) are queued for admin approval and trigger an email notification. All agentic actions appear in the Remediation page under the "Automatic" filter tab.

- **AI Risk Summary on identity detail** — Opening any identity with open findings now shows a "Risk Summary" block powered by Claude — a concise narrative covering their risk score, MFA status, app access breadth, device compliance, and blast radius. The summary loads in place in the identity detail panel, using the same visual style as the dashboard AI brief.

- **OAuth scope risk labels on unsanctioned apps** — The Applications page Unsanctioned tab now shows inline scope risk chips (e.g. "Writes email", "Reads calendar files") sourced from server-side OAuth scope interpretation. These labels surface the actual permission risk of each unsanctioned OAuth app, not just the finding category.

---

## March 23, 2026

### Improvements

- **In-app support form** — "Contact support" in the user menu now opens a proper support form (category, subject, message) instead of the Plain chat widget. Tickets are submitted directly to the support inbox and include your workspace name and plan for context. You'll receive a confirmation email when your ticket is submitted.

---

## March 21, 2026

### Improvements

- **Cross-platform identity context in findings** — Findings that affect a user active across multiple identity providers now say so explicitly. For example, "Tori Ferrante is active across Google Workspace and Okta but is logging in from a device not enrolled in your MDM." The finding detail panel also shows teal platform badges on the affected entity chip so the cross-platform scope is immediately visible.

- **One finding per person, not per platform record** — The intelligence engine now understands that the same email address across multiple integrations represents the same human being. Findings like "Active users without managed devices" now generate a single finding per person with full cross-platform context, rather than one finding per integration record. The underlying identity data model now has three distinct tiers: authoritative IDP only (for MFA rules), raw all-platform records (for cross-platform mismatch detection), and a new canonical per-person layer (for per-human findings).

### Fixes

- **OAuth scope false positives eliminated** — The platform was incorrectly flagging Figma, Slack, and other apps as having email inbox access because the basic OIDC `email` scope (which only provides a user's email address for authentication) was being matched as a substring of "mail." A centralized scope interpretation engine now tests each OAuth scope individually with precise patterns. `email` no longer implies inbox access — only explicit grants like `gmail.readonly` or `https://mail.google.com/` do. This fix applies across findings, AI analysis, briefs, and dossiers.

- **Shadow IT findings no longer duplicated** — Apps flagged as both "Unvetted app with sensitive data access" and "Unvetted OAuth applications detected" were appearing twice in the findings list. Apps already covered by the more specific sensitive-scope finding are now excluded from the general unvetted apps finding.

- **Impact analysis scores now match the Security Posture score** — The "Current" and "After action" scores shown in the "Simulate a fix" panel on finding detail were using an old raw severity-weighted formula. They now use the same sigmoid-normalized 0–100 Security Posture formula as the dashboard, so the numbers are consistent across the product. The panel badge now reads "+X posture pts" / "−X posture pts" to make the direction unambiguous.

---

## March 20, 2026

### New Features

- **SAML 2.0 SSO for enterprise workspaces** — Enterprise plan workspaces can now configure SAML 2.0 single sign-on directly from Settings → Security → SSO/SAML. Admins provide their IdP metadata URL and email domain; Thalian registers the SAML connection and displays the ACS URL and Entity ID to share with the IdP administrator. Supports both SP-initiated login (via the "Sign in with SSO" button on the login page) and IdP-initiated login (clicking the Thalian tile in Okta, Azure AD, or any SAML-compatible IdP). SSO users are automatically provisioned into the correct workspace on first sign-in. The SAML ACS endpoint is served from `auth.thalian.ai`.

### Improvements

- **Security Posture score history and sparkline** — The Security Posture stat on the dashboard now shows a live sparkline trend line (up to 30 data points) and a delta indicator (e.g., +5 or −3) comparing your current score to the previous analysis run. A point-in-time snapshot is recorded automatically after every analysis. The AI assistant also now has access to the full posture trend history, so it can tell you whether your security posture has been improving or declining over time.

### New Features

- **Status page issue report notifications** — When a user submits a report via the "Report an Issue" form on the status page, two emails are now triggered: an internal notification to support@thalian.ai with the reporter's email, affected service, and description, and a confirmation email to the reporter acknowledging receipt.

- **In-app feedback form** — A "Give feedback" option is now available in the bottom-left user menu. Submit bug reports, feature requests, or general feedback without leaving the app.

### Improvements

- **AI chat context — remediation history and prior assessments** — The AI assistant now has full visibility into remediation actions taken in the last 30 days, including pending approvals, completed actions, and Claude's prior reasoning from AI-generated assessments. If actions are awaiting approval, the assistant will proactively surface them.
- **AI chat context — richer entity data** — Findings in the AI prompt are now explicitly linked to the named user or app they affect, rather than relying on IDs. Device detail now includes OS platform and version. Application listings include category. Admin account lines include department where available.
- **Security Posture score** — The "Risk Score" stat on the dashboard has been replaced with a unified **Security Posture** score (0–100, higher is better). Uses sigmoid normalization so a single critical finding doesn't catastrophically tank the number, and noise (many low findings) doesn't equal a real critical threat. Displayed with a letter grade (A–F) and color-coded green/amber/red. The same formula now drives both the dashboard and the AI assistant — they will always agree on your score.
- **AI chat context — finding descriptions** — The assistant now receives the full description of each open finding (why the finding exists and what makes it risky), enabling it to explain findings in plain language rather than just naming them.
- **AI chat context — stale access analysis** — The assistant can now identify entitlements where the app hasn't been used in 90+ days, surfacing which apps have the most stale seats and which users have access they never use.
- **AI chat — what-if simulation tool** — The assistant can now answer "what would happen if I suspended this user?" or "how many findings would close if I revoked this access?" by running a live simulation against real workspace data before any action is taken.

### Fixes

- **Slack alert deduplication fixed — alerts no longer fire on every sync** — Two compounding bugs were causing alert rules to re-fire on every sync run. First, the dedup key used internal Supabase UUIDs as entity identifiers; since email-discovered apps were being deleted and re-inserted on each sync, they received new UUIDs each time, making every finding appear "new" and bypassing the dedup log. Second, the Google Workspace email app sync was deleting all email-discovered apps on every run, not just stale ones, causing apps to disappear and reappear with new IDs every other sync. Both are now fixed: dedup keys use stable external identifiers (OAuth client IDs, external system IDs, names) and the email app sync only removes apps that are genuinely absent from the current scan.
- **Integration sync failures now surface on the status page** — A sync error in any connected integration (Okta, Google Workspace, etc.) now correctly flips the integration's status to `error`, which the status page health check reads. Previously, failed syncs wrote a `sync_error` message but left the status field as `connected`, so the status page remained green. In addition, integrations that haven't synced in over 10 hours are now flagged as degraded even if no explicit error was recorded — catching silent failures where the sync process dies without writing an error.

---

## March 19, 2026

### New Features

- **AI-reasoned remediation** — For entities with multiple overlapping findings, ask Claude to analyze all open risks in context and propose a sequenced action plan with reasoning. Available from the Remediation page under "AI Recommendations" and from Identities via a one-click deep-link
- **AI vs. Auto badge differentiation** — Remediation action log now distinguishes Claude-reasoned plans ("AI" badge, violet) from deterministic rule-based automation ("Auto" badge, teal)
- **AI reasoning in approval cards** — When reviewing Claude-proposed actions, the approval card now shows Claude's assessment — what the situation is, what risk it poses, and why the recommended actions are the right response
- **Public status page** — Real-time platform health at [status.thalian.ai](https://status.thalian.ai) with incident history and email subscription for downtime alerts
- **Layer 3 behavioral baselines** — Per-entity anomaly detection that builds individual baselines for users, devices, and apps and flags deviations from established patterns
- **Findings notification filtering** — Alert notifications now fire only on new findings; recurring open findings no longer generate repeat alerts

### Improvements

- **Status page** — Per-service 90-day uptime bars now visible under each service row without expanding; incident cards show affected services chips; uptime bar tooltips include status label; social sharing previews (OG/Twitter cards) now supported
- **Findings page** — Each tab now includes a short descriptor explaining what the tab tracks, reducing onboarding friction
- **Causality Insights** — Redesigned compact card layout for the insights tab; remediation suggestions are now entity-specific based on the finding subject
- **Performance** — Initial app bundle reduced by 69%; database queries parallelized for faster page load
- **Auto-sync reliability** — Integrations now sync in parallel, preventing worker timeouts on workspaces with many connected platforms

### Security

- Auth guards and workspace scoping added to 7 previously unguarded API endpoints

### Changes

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
