---
date: 2026-04-22
slug: april-2026-update-1
---

# GitLab, PingOne, Datadog, recurring access reviews, and remediation playbooks

Three new integrations, 400+ detection rules, recurring access reviews with PDF evidence export, remediation playbooks, cross-platform offboard cascade, and Claude Opus 4.7.

<!-- more -->

## New integrations

**GitLab** — Connect GitLab to detect unmanaged members not in your IDP, stale personal access tokens, protected branch policy gaps, MFA enforcement issues, and overprivileged maintainers. 8 detection rules.

**PingOne (Ping Identity)** — Full IDP integration. Syncs users, groups, and authentication policies. Detects SSO enforcement gaps, offboarded employees with active accounts, and MFA policy weaknesses.

**Datadog** — Syncs users and role assignments. Detects users not in your corporate IDP, admin sprawl, and offboarded employees with active Datadog access. 4 detection rules.

## Detection rules — 400+ across 42 platforms

New rules added since the April launch:

- **Device posture** — Intune noncompliant admin device, Jamf FileVault and stale check-in, 7 additional Fleet rules (15 total), 6 MDM × IDP compound rules
- **Access hygiene** — Workday separation of duties and stale contractor access, JumpCloud (3 rules), OneLogin (3 rules), Workspace ONE and Iru enrollment and compliance rules
- **Collaboration** — Microsoft Teams offboarded user activity and external guest admin, SharePoint external sharing by departing employee, Outlook forwarding to external address
- **Confluence + Jira** — Audit log permission escalation and non-admin permission changes
- **Salesforce** — Permission set assignments outside standard profiles, session security policy gaps
- **SentinelOne** — Ranger unmanaged device detection on corporate network
- **Box** — Shield alert detection, departing employee bulk download detection

## Access reviews

**Recurring campaigns** — Schedule access reviews to recur weekly, monthly, or quarterly. Thalian auto-creates the next campaign when the current one closes.

**PDF evidence export** — Export a completed campaign as a PDF audit artifact with all decisions, notes, and reviewer attribution — ready to attach to a SOC 2 or ISO 27001 evidence request.

**Archive and delete** — Archive completed campaigns or delete ones created in error.

## Remediation

**Remediation playbooks** — Define multi-step automated response sequences. A playbook can chain IDP suspension, device unenrollment notification, license revocation, and ticket creation into a single triggered workflow.

**Cross-platform offboard cascade** — When you offboard an identity, Thalian auto-discovers every integration capable of executing a revocation action and queues them in sequence. No more manually tracking which platforms still have active access.

**Block app: real IDP revocation** — Block App now triggers org-wide OAuth token revocation through your IDP (Google Workspace, Okta, or Entra), not just a policy label. Consistent across finding detail, entity panel, and AI remediation.

**Finding detail panel** — Finding detail now shows resolved attribution (who, when, how), related findings on the same entity, full remediation history, and a sticky action footer.

## AI

- **Claude Opus 4.7** — AI Brief, AI Chat, and the remediation planner now run on Claude Opus 4.7
- **Anti-hallucination guards** — AI Brief and AI Chat no longer surface findings, MFA warnings, or platform-specific claims when the relevant integration is not connected
- **Create access review from AI chat** — Ask the AI assistant to create a review campaign directly
- **AI chat context expansion** — Risk score breakdown, platform display names, and click-based context from findings and entity panels now included

## Platform & posture

- **Compliance Trend tab** — Rule status over time on the Compliance page
- **Posture and drift history** — Extended to approximately 1 year for Pro workspaces
- **Pro plan retention** — Aligned to 1 year across audit log, findings, and posture history
- **Workspace risk score** — Rebuilt with a linear formula and exclusion filters; scores no longer inflate from deprovisioned entities or already-remediated findings
- **License waste ROI** — Weekly digest now includes estimated license waste cost across ~70 benchmarked applications
- **In-app status banner** — Appears automatically during active service incidents
- **Webhooks** — Destination picker, `finding_resolved` event, `remediation_executed` rename, retry logic, and HMAC payload signing
- **Google-only IDP** — SSO gap findings reframed as OAuth governance issues for Google-authenticated users

## Other improvements

- **MFA accuracy** — Passkey-only Google Workspace admins, GWS 100% coverage bug, and no-MFA inference from findings — all fixed
- **Shadow IT noise** — Sanctioning an app auto-resolves related shadow IT findings; duplicate OAuth findings deduplicated
- **Enterprise audit log** — 365-day export cutoff removed
- **PDF exports** — Formatting fixed across Access Reviews and Compliance pages
- **Omnissa rebrand** — Workspace ONE vendor references updated from VMware to Omnissa

[View on GitHub](https://github.com/thalian-ai/thalian/releases/tag/v2026.04.1)
