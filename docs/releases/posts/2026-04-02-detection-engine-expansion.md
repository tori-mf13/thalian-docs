---
date: 2026-04-02
slug: detection-engine-expansion
---

# 316 detection rules, Zoom and Box integrations, cross-platform compound findings

Thalian's detection engine nearly doubled — from 173 rules to 316 — with new integrations, deeper platform analysis, and findings that require 3+ connected platforms to surface.

<!-- more -->

## New integrations

**Zoom** — Detect users and admins not in your corporate IDP, SSO enforcement gaps, offboarded employees with active accounts, and stale unused seats. 5 rules.

**Box** — Detect IDP gaps, offboarded employees retaining file access, and external sharing spikes. 4 rules.

## Cross-platform compound rules

14 new rules fire only when 3+ platforms are connected — these are findings no single tool can produce:

- Terminated in HR, suspended in IDP, device still enrolled and not wiped
- Active EDR threat on a cloud infrastructure admin's device
- Same person is admin in IDP, cloud infrastructure, and CRM simultaneously
- Terminated employee still a GitHub organization member (not removed by IDP deprovisioning)

## Deep platform analysis

- **AWS IAM**: Credential Report (key rotation, usage), root MFA, CloudTrail root activity, IAM role trust policies
- **GCP IAM**: Service account key monitoring and Workload Identity adoption
- **Salesforce**: Profile permissions (ModifyAllData detection), session IP restrictions, bulk data export events
- **Entra ID**: Identity Protection risky users, PIM permanent assignments, admin MFA method weakness
- **Okta**: ThreatInsight, MFA enrollment policies, password strength, API token hygiene

## AI assistant enhancements

The AI assistant now surfaces security configuration data from all connected platforms — ask about AWS access key rotation, GCP service account keys, Salesforce data exports, Okta config weaknesses, or Entra credential expiry and get answers with real data.

[View on GitHub](https://github.com/thalian-ai/thalian/releases/tag/v2026.04)
