---
date: 2026-04-04
slug: april-2026-updates
---

# April 2026: bulk access reviews, FAIR risk scoring, and integration error UX

Thalian now supports bulk decisions in access review campaigns, a FAIR-aligned entity risk model, and smarter integration error handling.

<!-- more -->

## Bulk access review decisions

Access review campaigns now support bulk approve and bulk revoke. Select multiple items, apply a decision, and move through large reviews faster. Campaigns past their due date automatically send overdue reminder emails to reviewers with a direct link to the campaign.

## FAIR-aligned entity risk scoring

Entity risk scores have been redesigned around a FAIR-aligned model that weighs privilege level, platform exposure, finding severity, and behavioral signals. Scores are more meaningful and comparable across identity types — a stale admin on three platforms scores differently than a standard user with one low-severity finding.

## Integration error classification

Integration errors are now classified by type: authentication expired, configuration invalid, rate limited, or API error. A sidebar badge shows the count of integrations needing attention, and a dismissible app-wide banner appears when critical auth errors require reconnection. No more guessing why a sync failed.

## Trial extension + compliance preview

Free-tier users can now self-serve a one-time trial extension from the billing page. The Compliance page is visible in preview mode for free users with a plan gate, so prospects can evaluate the value before upgrading.

## Other highlights

- **Blast radius orbit visualization** — Entity detail blast radius now renders as an interactive orbit diagram
- **Behavioral baseline accuracy** — Directory login events excluded from baselines when a dedicated IDP is connected
- **Finding category consolidation** — "Configuration" category folded into "Access Risk" and "Identity Security"
- **AI prompt injection hardening** — Topic-scoping guardrails prevent manipulation of AI assistant responses
- **Billable identity fix** — Count now only includes IDP/directory users, not SaaS-only accounts
- **MTTR fix** — Auto-resolved findings excluded from mean time to resolution calculations
