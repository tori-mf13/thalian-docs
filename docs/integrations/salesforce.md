# Connect Salesforce

Step-by-step guide to connecting Salesforce to Thalian for CRM identity gap detection and access hygiene.

---

## What Thalian detects

Thalian cross-references Salesforce users against your corporate identity provider and analyzes Salesforce security configuration for 9 detection rules total:

**IDP gap detection:**

- **Salesforce admin not in IDP** — a Salesforce System Administrator is not present in your IDP, meaning their privileged CRM access is invisible to your offboarding workflow (critical)
- **Salesforce user not in IDP** — a standard Salesforce user has no matching IDP account (high)
- **Stale active Salesforce user** — a Salesforce user whose IDP account is suspended or deprovisioned but whose Salesforce account remains active (high)
- **Connected app by unknown user** — a Salesforce Connected App is being used by someone not present in your IDP (medium)

**Admin privilege analysis:**

- **Admin with ModifyAllData permission** — a Salesforce admin has the `ModifyAllData` profile permission, granting unrestricted write access to all CRM records (high)
- **Admin with ViewAllData permission** — a Salesforce admin has the `ViewAllData` profile permission, enabling bulk data extraction of all CRM records (high)

**Session and data export monitoring:**

- **Session IP restriction not enforced** — the Salesforce org has no session IP restriction configured, allowing logins from any IP (medium)
- **Bulk data export detected** — `SetupAuditTrail` shows a bulk data export event in the sync window — potential mass data exfiltration (high)
- **Data export by non-admin** — a bulk data export event was performed by a user without a System Administrator profile (critical)

Salesforce does not sync automatically with corporate directories. When an employee leaves and their Okta or Entra account is disabled, their Salesforce license and access remain active until explicitly revoked.

---

## Prerequisites

- **Salesforce org** — Production or Sandbox
- **Salesforce admin account** to authorize the OAuth connection

---

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Salesforce** and click **Connect**
3. Click **Authorize with Salesforce** — you'll be redirected to the Salesforce login page
4. Sign in with your Salesforce admin account
5. Review the requested permissions and click **Allow**
6. You'll be redirected back to Thalian — the integration is now connected and the first sync begins

Thalian uses a pre-configured Salesforce Connected App with the following read-only OAuth scopes:

| Scope | Justification |
|---|---|
| `api` | Access the Salesforce REST API to read user profiles, roles, and OAuth token grants |
| `refresh_token` | Allows Thalian to maintain the connection without re-prompting for authorization |
| `offline_access` | Standard scope that allows background sync when you're not actively logged in |
| `id` | Reads the connecting user's basic identity (name, email) during the OAuth callback |

No write permissions are requested. Thalian does not modify Salesforce data.

---

## What Thalian syncs

- **All active users** — user profiles, roles, login history, and profile type (System Administrator vs. standard user)
- **Admin profile permissions** — `ModifyAllData` and `ViewAllData` permission flags for each admin profile
- **Connected Apps** — OAuth applications authorized by Salesforce users, including the authorizing user's identity
- **Session configuration** — org-level session IP restriction settings
- **SetupAuditTrail** — recent admin activity events, including bulk data export events
- **IDP gap detection** — each Salesforce user is cross-referenced against your connected IDP by email address

Thalian does not read or sync Salesforce records, opportunities, contacts, or any CRM data. Only user identity, access, and audit data is collected.

---

## Remediation

Salesforce is a **read-only integration**. Thalian surfaces findings but does not modify Salesforce user accounts directly. Remediation for Salesforce findings targets the IDP or the Salesforce console:

- **Admin not in IDP / User not in IDP** — remediate by suspending the account in Salesforce manually, or by provisioning the user in your IDP
- **Stale active user** — remediate by deactivating the Salesforce user in Setup → Users
- **Connected app by unknown user** — revoke the app authorization in Salesforce Setup → Connected Apps → OAuth Connected Apps Usage

---

## Troubleshooting

- **OAuth error during connect:** Ensure pop-ups are not blocked and try again. If the error persists, contact support.
- **No users found:** The authorizing account needs sufficient permissions to read user data via the Salesforce API
- **Sandbox vs. Production:** If you need to connect a Sandbox org, select "Sandbox" in the Thalian connection form — the OAuth endpoints differ
- **IDP gaps not detected:** Ensure at least one IDP (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) is connected and synced

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
