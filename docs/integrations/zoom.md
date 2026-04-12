# Connect Zoom

Step-by-step guide to connecting Zoom to Thalian for identity gap detection and SSO enforcement monitoring.

---

## What Thalian detects

Thalian cross-references Zoom users against your corporate identity provider and checks account security configuration for 5 detection rules:

| Finding | Severity |
|---|---|
| Zoom admin not in IDP — a Zoom administrator has no matching IDP account | Critical |
| Offboarded employee with active Zoom account — a Zoom user whose IDP account is deprovisioned or suspended | Critical |
| Zoom user not in IDP — a standard Zoom user has no matching IDP account | High |
| SSO enforcement gap — Zoom users are not required to authenticate via SSO | High |
| Stale unused Zoom seat — a Zoom user has not logged in within the last 90 days | Medium |

---

## Prerequisites

- **Zoom account** (Pro, Business, or Enterprise)
- **Zoom admin** permissions to install and authorize OAuth apps
- At least one IDP (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) connected for IDP gap detection

---

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Zoom** and click **Connect**
3. Click **Authorize with Zoom** — you'll be redirected to the Zoom authorization page
4. Sign in with your Zoom admin account
5. Review the requested permissions and click **Allow**
6. You'll be redirected back to Thalian — the integration is now connected and the first sync begins

### Requested scopes

| Scope | Justification |
|---|---|
| `user:read:admin` | Reads all users in the Zoom account — names, emails, roles, and last login timestamps |
| `account:read:admin` | Reads account-level security settings including SSO enforcement configuration |

No write permissions are requested. Thalian does not modify Zoom users or settings.

---

## What Thalian syncs

- **All Zoom users** — name, email, user type (Basic, Licensed, On-Prem), role, and last login timestamp
- **Admin roles** — users with Zoom admin or co-admin privileges
- **Account security settings** — SSO enforcement status and sign-in method configuration
- **IDP gap detection** — each Zoom user is cross-referenced against your connected IDP by email address

---

## Remediation

Zoom is a **read-only integration** — Thalian surfaces findings but does not modify Zoom user accounts. Remediation for Zoom findings targets the IDP or the Zoom admin console:

- **Admin or user not in IDP** — provision the user in your IDP, or deactivate the Zoom account in the Zoom Admin portal
- **Offboarded employee** — deactivate the user in the Zoom Admin portal → **User Management**
- **SSO enforcement gap** — enable SSO enforcement in Zoom Admin → **Security** → **Sign-in methods**

---

## Troubleshooting

- **No users found:** Ensure the authorizing account is a Zoom admin with access to the full user list
- **IDP gaps not detected:** Confirm at least one IDP is connected and synced before Zoom findings will fire
- **SSO enforcement rule not firing:** The rule fires when SSO is supported but not enforced. If your account is on a Zoom plan that does not support SSO, the rule will not apply

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
