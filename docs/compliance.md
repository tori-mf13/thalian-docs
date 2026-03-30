# Compliance

The Compliance page maps Thalian's findings and controls directly to SOC 2 Type II and ISO 27001 requirements — so your team can see at a glance which controls are covered, which are at risk, and what evidence Thalian has already collected.

---

## What is the Compliance page?

The Compliance page (`/compliance`) translates Thalian's raw findings into control-level coverage across two frameworks:

- **SOC 2 Type II** — Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy)
- **ISO 27001** — Annex A controls

For each control, Thalian shows:

- **Status** — Covered, At Risk, or Not Applicable
- **Related findings** — open findings that affect this control's compliance posture
- **Evidence** — links to the data Thalian has collected that supports the control (audit logs, identity records, device compliance status, etc.)

---

## Availability

The Compliance page is available on **Pro and Enterprise** plans. It is accessible to users with the **Security Analyst**, **Admin**, **Super Admin**, or **Auditor** role.

---

## SOC 2 coverage

Thalian maps its findings across the five Trust Services Criteria:

### CC6 — Logical and Physical Access Controls

| Control | What Thalian monitors |
|---|---|
| CC6.1 | MFA enforcement across all connected IDPs and SaaS apps |
| CC6.2 | User provisioning and deprovisioning via IDP sync |
| CC6.3 | Role-based access and privilege minimization findings |
| CC6.6 | External user access — outside collaborators, guest accounts, shadow IT |
| CC6.7 | Terminated user access detection across all connected platforms |

### CC7 — System Operations

| Control | What Thalian monitors |
|---|---|
| CC7.1 | Device compliance and endpoint health across MDM platforms |
| CC7.2 | Behavioral anomaly detection and unusual access pattern alerts |
| CC7.3 | Security incident detection via cross-platform correlation |

### CC8 — Change Management

| Control | What Thalian monitors |
|---|---|
| CC8.1 | Admin role changes and privilege drift across platforms |

### CC9 — Risk Mitigation

| Control | What Thalian monitors |
|---|---|
| CC9.2 | Vendor and third-party access via OAuth grants and connected app monitoring |

---

## ISO 27001 coverage

Thalian maps findings to Annex A controls across access management, asset management, and operations security:

| Annex A Control | What Thalian monitors |
|---|---|
| A.5.15 — Access control | IDP-to-SaaS entitlement coverage and gaps |
| A.5.16 — Identity management | Identity lifecycle — provisioning, deprovisioning, MFA status |
| A.5.17 — Authentication | MFA coverage, password policy violations, stale credentials |
| A.5.18 — Access rights | Privilege minimization, admin sprawl, dormant access |
| A.5.19 — Information security in supplier relationships | Third-party OAuth grants, shadow IT, connected app permissions |
| A.8.8 — Management of technical vulnerabilities | Endpoint compliance, OS version currency, EDR coverage |

---

## Using compliance status in reviews

The Compliance page is designed to be used alongside your access reviews and audit preparation:

- **Before an audit:** run the Compliance page to identify controls that have open findings — these are the areas an auditor is most likely to probe
- **During an access review:** link your Access Review campaign decisions as evidence against CC6.7 (terminated user access) and A.5.18 (access rights)
- **For a penetration test prep:** use the At Risk controls to prioritize remediation before external testing begins

---

## Exporting compliance evidence

Each control in the Compliance page has an **Export Evidence** option that generates a summary of:

- Control description
- Thalian's coverage status
- Supporting data (finding count, affected entities, last sync timestamp)
- Links to related audit log entries

This output can be attached directly to audit request responses or included in a security review package.

---

*For information on running structured access certifications, see [Access Reviews](./access-reviews.md).*
*For information on Thalian's own security posture, see [Information Security Policy](./information-security-policy.md).*
