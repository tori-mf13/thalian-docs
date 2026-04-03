---
date: 2026-04-02
slug: gcp-iam-fixes
---

# GCP IAM sync fixes and analysis reliability improvements

GCP IAM sync now works reliably across all GCP organization configurations, and the analysis engine handles edge cases that previously caused silent data loss.

<!-- more -->

## GCP IAM

- **Project discovery fallback** -- GCP sync now falls back to the v1 projects API when v3 projects:search returns empty (common in environments without org-level permissions). All project-level IAM bindings are now discovered regardless of organization structure.
- **Role names in findings** -- GCP IAM findings now display specific role names (Owner, Editor, Viewer) instead of generic "IAM access" descriptions.
- **Identity type fix** -- Service accounts are now correctly classified, resolving a constraint violation that previously prevented all GCP identities from syncing.

## Analysis engine

- **Batch insert resilience** -- If a batch insert fails (e.g., one finding with a duplicate key), the engine now retries each row individually so only the offending row is skipped.
- **Finding key disambiguation** -- Rules that produce multiple findings with type `identity_group` now generate unique finding keys, preventing batch collisions.
- **Correlation finding links** -- "Related findings" on compound findings now correctly link to the stable DB IDs instead of stale in-memory UUIDs.
- **Error visibility** -- Insert failures are now captured in Sentry and the audit log instead of only logging to ephemeral worker console.

## Integration removal

- **FK constraints changed to CASCADE** -- Deleting an integration now automatically cascades to identities, applications, and devices at the database level. Previously, these used SET NULL, creating orphaned entities that generated ghost findings.
- **Explicit entity cleanup** -- The removal flow now explicitly deletes entities before the integration row as a belt-and-suspenders safeguard.
