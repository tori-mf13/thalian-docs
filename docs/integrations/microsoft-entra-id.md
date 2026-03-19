# Connect Microsoft Entra ID

Step-by-step guide to connecting Microsoft Entra ID (formerly Azure AD) to Thalian for identity and access intelligence.

---

## Prerequisites

- **Microsoft 365 tenant** with an Entra ID directory
- **Global Reader** or **Global Administrator** role to authorize the OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Microsoft Entra ID** and click **Connect**
3. Click **Authorize with Microsoft**
4. Sign in with your Microsoft admin account
5. Review the requested permissions — Thalian requests read-only scopes for directory data and sign-in logs
6. Click **Accept** to grant consent
7. You'll be redirected back to Thalian — the integration is now connected

### Scope Warnings

If your tenant policies restrict certain consent scopes, Thalian detects this and shows which features are degraded. You can reconnect at any time to grant additional permissions.

## Requested Permissions

A single Microsoft OAuth consent covers Entra ID and all other Microsoft integrations (Intune, Outlook, SharePoint, Teams). Thalian requests the following scopes:

| Scope | Used by | Justification |
|---|---|---|
| `User.Read.All` | Entra ID | Enumerates all tenant users — names, departments, MFA status, account enabled/disabled — to build the identity inventory and risk scores |
| `Directory.Read.All` | Entra ID | Reads directory role assignments to classify admin vs. standard accounts and detect privilege escalation |
| `AuditLog.Read.All` | Entra ID | Ingests sign-in logs and directory audit events to detect risky sign-ins, impossible travel, MFA bypass, and privilege changes |
| `Application.Read.All` | Entra ID | Discovers enterprise app registrations and their role assignments to identify overprivileged or risky third-party OAuth apps |
| `DeviceManagementManagedDevices.Read.All` | Intune | Pulls Intune-managed device inventory — OS version, compliance state, encryption status — for endpoint posture checks |
| `Mail.Read` | Outlook | Detects suspicious mailbox forwarding rules (a common exfiltration vector). Does not read email body/content |
| `MailboxSettings.Read` | Outlook | Reserved for future mailbox configuration analysis |
| `Sites.Read.All` | SharePoint | Reads SharePoint site metadata and external sharing settings to flag overshared or publicly accessible sites |
| `ChannelMessage.Send` | Teams | Reserved for future Teams alert delivery |
| `Team.ReadBasic.All` | Teams | Reserved for future Teams workspace enumeration |
| `offline_access` | All | Standard OAuth — allows token refresh without re-prompting the admin |
| `openid` | All | Standard OIDC — required to receive an id_token for tenant ID extraction |
| `profile` | All | Standard OIDC — returns admin's display name during initial connect |
| `email` | All | Standard OIDC — returns admin's email address during initial connect |

## Alternative: API Credentials

If your organization restricts OAuth consent flows, you can connect using application credentials instead:

1. Register an application in **Entra ID** → **App registrations**
2. Grant the application the `Directory.Read.All` and `AuditLog.Read.All` permissions (application type)
3. Create a **client secret**
4. In Thalian, select the **API** connection method
5. Enter your **Tenant ID**, **Client ID**, and **Client Secret**
6. Click **Save**

## What Thalian Syncs

- **Users** — full directory including status, last sign-in, and license assignments
- **Groups** — group memberships, dynamic groups, and role assignments
- **Sign-in logs** — successful and failed sign-ins with location and device details
- **Enterprise apps** — registered and consented applications
- **Conditional access** — policies and their current state

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
