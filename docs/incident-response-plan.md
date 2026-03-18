# Incident Response Plan

**Thalian, Inc.**
**Effective Date:** March 2026
**Last Reviewed:** March 18, 2026
**Owner:** Engineering & Security Team
**Classification:** Public

---

## 1. Purpose

This plan establishes procedures for detecting, responding to, and recovering from security incidents affecting the Thalian platform, its infrastructure, or customer data. The goal is to minimize impact, preserve evidence, and restore normal operations as quickly as possible.

## 2. Scope

This plan covers:

- Security breaches or suspected breaches of the Thalian platform
- Unauthorized access to customer workspace data
- Compromise of integration credentials or encryption keys
- Infrastructure outages affecting data integrity or availability
- Third-party vendor incidents affecting Thalian services

## 3. Severity Definitions

| Level | Name | Description | Response Time | Examples |
|---|---|---|---|---|
| **P1** | Critical | Active data breach, credential exposure, or complete service outage | Immediate (< 1 hour) | Database breach, encryption key compromise, production down |
| **P2** | High | Significant security risk or partial service degradation | < 4 hours | Unauthorized API access, integration credential leak, auth bypass |
| **P3** | Medium | Contained security issue or non-critical degradation | < 24 hours | Single-tenant data anomaly, elevated error rates, failed health checks |
| **P4** | Low | Minor issue with no immediate security impact | < 72 hours | Dependency vulnerability (no exploit path), cosmetic security header issue |

## 4. Detection Sources

### Automated
- **Sentry:** Frontend error monitoring with 10% trace sampling. Captures unhandled exceptions, React ErrorBoundary triggers, and performance anomalies
- **Health endpoint:** `GET /api/health` checks Supabase connectivity and returns `200 OK` or `503 Degraded` with latency measurements. Configured for uptime monitoring
- **CI security scanner:** Automated secrets detection on every push — flags any credentials committed to source
- **npm audit:** Dependency vulnerability scanning on every CI build

### Manual / Observational
- **Audit log review:** All security-relevant actions are logged with SHA-256 hashes. Anomalous patterns (bulk data access, unexpected role changes, off-hours activity) can be detected via the Reports > Audit Log tab
- **User reports:** Customers report issues via support@thalian.ai or in-app channels
- **Vendor notifications:** Security advisories from Supabase, Cloudflare, Anthropic, or other vendors

## 5. Response Procedures

### 5.1 Triage (First 15 minutes)

1. **Confirm the incident** — Verify alerts are genuine, not false positives. Check Sentry, health endpoint, and audit logs
2. **Assign severity** — Use the definitions in Section 3
3. **Designate an Incident Commander** — One person owns the response from this point forward
4. **Establish a communication channel** — Dedicated thread for the incident (Slack, etc.)
5. **Begin timeline documentation** — Record all actions taken with timestamps

### 5.2 Containment (P1: < 30 min, P2: < 2 hours)

**For credential compromise:**
- Rotate the affected secret immediately in Cloudflare environment variables
- If integration credentials: re-encrypt affected records via `_crypto.js` with new encryption key
- Invalidate all active sessions for affected workspaces via Supabase Auth admin API

**For unauthorized access:**
- Revoke the compromised user's sessions
- Check audit log for actions taken by the compromised account
- If workspace-level: temporarily disable the workspace's integrations to stop data sync

**For infrastructure compromise:**
- Engage Cloudflare and/or Supabase support immediately
- If database: enable Supabase Point-in-Time Recovery (PITR) for restoration
- Rotate all service-level credentials (SUPABASE_SERVICE_KEY, ENCRYPTION_KEY, SYNC_SECRET)

### 5.3 Investigation

1. **Preserve evidence** — Audit logs are immutable (SHA-256 hashed) and never deleted. Export affected workspace audit logs via `/api/export-audit-log`
2. **Determine scope** — Which workspaces, users, and data were affected?
3. **Identify root cause** — How did the attacker gain access? What vulnerability was exploited?
4. **Assess data impact** — Was data exfiltrated, modified, or destroyed?
5. **Document findings** — Full incident timeline with technical details

### 5.4 Remediation

1. **Fix the vulnerability** — Deploy a patch via the standard change management process (emergency change if P1/P2)
2. **Verify the fix** — Confirm the attack vector is closed
3. **Restore affected data** — Use Supabase PITR if data was corrupted
4. **Re-enable services** — Bring any disabled integrations or workspaces back online
5. **Monitor for recurrence** — Heightened monitoring for 72 hours post-remediation

### 5.5 Communication

**Internal:**
- P1/P2: Notify all team members immediately
- P3/P4: Notify relevant team members within 24 hours

**Customer notification (if data was compromised):**
- Notify affected workspace owners within 72 hours of confirming a breach
- Include: what happened, what data was affected, what actions were taken, what customers should do
- Provide ongoing updates until resolution

**Regulatory:**
- Assess whether notification obligations exist under applicable data protection laws (GDPR, CCPA, etc.)
- Engage legal counsel for P1 incidents

## 6. Post-Incident Review

Within 5 business days of incident resolution:

1. **Conduct a blameless retrospective** — Focus on systems and processes, not individuals
2. **Document lessons learned** — What worked, what didn't, what should change
3. **Create action items** — Specific, assigned, and time-bound improvements
4. **Update this plan** — If the incident revealed gaps in the response process
5. **Share findings** — Brief relevant stakeholders on the outcome (sanitized for customer data)

## 7. Evidence Preservation

Thalian's architecture supports evidence preservation by design:

- **Audit logs are immutable:** SHA-256 content hashing prevents tampering. Minimum 365-day retention
- **Audit logs are exportable:** JSON export via API endpoint for offline forensic analysis
- **Retention enforcement skips audit_log:** The automated data retention system explicitly excludes the audit_log table
- **Git history:** All source code changes are tracked in version control with author attribution

## 8. Plan Testing

This plan will be tested annually through:

- Tabletop exercises simulating P1 and P2 scenarios
- Review of real incidents (if any) against the documented procedures
- Verification that detection sources (Sentry, health endpoint, CI scanner) are functioning

## 9. Contact Information

| Role | Contact |
|---|---|
| Incident Commander (primary) | Engineering lead |
| Supabase Support | support@supabase.io |
| Cloudflare Support | Cloudflare dashboard |
| Security reports | security@thalian.ai |
| Customer support | support@thalian.ai |

---

*This document is maintained in the Thalian source repository and deployed to docs.thalian.ai.*
