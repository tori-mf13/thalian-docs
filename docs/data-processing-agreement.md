# Data Processing Agreement

**Thalian, LLC**
**Effective Date:** March 2026
**Last Reviewed:** March 18, 2026

---

## 1. Introduction

This Data Processing Agreement ("DPA") supplements the [Terms of Service](./terms-of-service.md) and governs the processing of personal data by Thalian, LLC ("Processor") on behalf of the customer organization ("Controller") when using the Thalian platform ("Service").

This DPA applies where Thalian processes personal data on the Controller's behalf in the course of providing the Service. For purposes of this DPA, "personal data," "processing," "data subject," and "supervisory authority" have the meanings given to them in the EU General Data Protection Regulation (GDPR) or equivalent applicable data protection law.

## 2. Roles

- **Controller:** The customer organization that connects integrations and manages workspace data
- **Processor:** Thalian, LLC, which processes data on the Controller's behalf to provide the Service

## 3. Scope of Processing

### Categories of Data Subjects

- Employees and contractors of the Controller's organization
- Users of the Controller's IT systems (identity provider accounts, device users)

### Categories of Personal Data

| Category | Examples |
|---|---|
| **Identity data** | Names, email addresses, usernames, employee IDs |
| **Access data** | Roles, group memberships, application entitlements, MFA status |
| **Device data** | Device names, serial numbers, OS versions, compliance status |
| **Activity data** | Last login dates, application usage timestamps, sign-in events |
| **Security data** | MFA enrollment status, password change dates, session activity |

### Purpose of Processing

Processing is performed solely to provide the Service as described in the Terms of Service, including:

- Syncing and storing data from connected integrations
- Running AI analysis to generate findings and insights
- Enabling remediation workflows
- Generating reports and audit trails

## 4. Processor Obligations

Thalian shall:

- Process personal data only on documented instructions from the Controller (i.e., through the Service configuration)
- Ensure that persons authorized to process personal data have committed themselves to confidentiality
- Implement appropriate technical and organizational measures as described in the [Information Security Policy](./information-security-policy.md)
- Not engage a sub-processor without prior authorization (see Section 5)
- Assist the Controller in responding to data subject requests (access, deletion, portability)
- Delete or return all personal data upon termination of the Service, after the 30-day retention period
- Make available all information necessary to demonstrate compliance with this DPA

## 5. Sub-Processors

Thalian uses the following sub-processors:

| Sub-Processor | Service | Data Processed | Location |
|---|---|---|---|
| **Supabase** | Database and authentication | All Customer Data | United States |
| **Cloudflare** | Application hosting, CDN, Workers | Request routing, static assets | Global (edge) |
| **Anthropic** | AI analysis (Claude API) | Workspace context in prompts | United States |
| **Stripe** | Payment processing | Billing data | United States |
| **Sentry** | Error monitoring | Technical error data | United States |

The Controller authorizes the use of the sub-processors listed above. Thalian will notify the Controller of any intended changes to sub-processors, giving the Controller the opportunity to object.

## 6. Security Measures

Thalian implements the following technical and organizational measures:

- **Encryption at rest:** AES-256-GCM for integration credentials; Supabase transparent encryption for database
- **Encryption in transit:** TLS 1.2+ on all connections
- **Access control:** Role-based access with six permission levels; Row Level Security on all tables
- **Audit logging:** Immutable, SHA-256 hashed logs of all security-relevant actions
- **Data isolation:** Workspace-scoped queries at application and database layers prevent cross-tenant access
- **Credential management:** Secrets stored as environment variables, never in source code
- **Incident response:** Thalian maintains a documented incident response plan; available to customers upon request under NDA

## 7. Data Subject Rights

Thalian will assist the Controller in fulfilling data subject requests:

- **Access:** Workspace data export is available via the Settings page
- **Deletion:** Contact support@thalian.ai to request data deletion
- **Portability:** Workspace export produces a JSON file of all data
- **Rectification:** Data can be updated through the Service or by re-syncing integrations

## 8. Data Breach Notification

In the event of a personal data breach:

- Thalian will notify the Controller without undue delay, and no later than 72 hours after becoming aware of the breach
- Notification will include: the nature of the breach, categories of data affected, likely consequences, and measures taken or proposed
- Full breach response procedures are maintained internally and available to customers upon request under NDA

## 9. International Transfers

Where personal data is transferred outside the European Economic Area (EEA):

- Transfers to US-based sub-processors are covered by Standard Contractual Clauses (SCCs) or equivalent safeguards provided by each sub-processor
- The Controller acknowledges that AI processing (Anthropic) occurs in the United States

## 10. Duration and Termination

- This DPA remains in effect for the duration of the Service agreement
- Upon termination, Thalian will delete Customer Data within 30 days
- Audit logs are retained for a minimum of 365 days regardless of termination, as required by the [Information Security Policy](./information-security-policy.md)

## 11. Contact

For DPA inquiries, contact legal@thalian.ai.

---

*For the complete privacy practices, see [Privacy Policy](./privacy-policy.md).*
