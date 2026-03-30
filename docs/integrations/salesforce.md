# Connect Salesforce

Step-by-step guide to connecting Salesforce to Thalian for CRM identity gap detection and access hygiene.

---

## What Thalian detects

Thalian cross-references Salesforce users against your corporate identity provider to surface CRM access that exists outside your IDP lifecycle:

- **Salesforce admin not in IDP** — a Salesforce System Administrator is not present in your IDP, meaning their privileged CRM access is invisible to your offboarding workflow (critical)
- **Salesforce user not in IDP** — a standard Salesforce user has no matching IDP account (high)
- **Stale active Salesforce user** — a Salesforce user whose IDP account is suspended or deprovisioned but whose Salesforce account remains active (high)
- **Connected app by unknown user** — a Salesforce Connected App is being used by someone not present in your IDP (medium)

Salesforce does not sync automatically with corporate directories. When an employee leaves and their Okta or Entra account is disabled, their Salesforce license and access remain active until explicitly revoked.

---

## Prerequisites

- **Salesforce org** — Production or Sandbox
- **Salesforce admin account** with permission to create Connected Apps

---

## Step 1 — Create a Connected App in Salesforce

Thalian connects using OAuth 2.0. You'll create a Connected App in Salesforce that grants read-only API access.

1. Sign in to your Salesforce org
2. Go to **Setup** → search for **App Manager** → click **New Connected App**
3. Fill in the required fields:
   - **Connected App Name:** `Thalian`
   - **API Name:** `Thalian` (auto-filled)
   - **Contact Email:** your admin email
4. Under **API (Enable OAuth Settings)**:
   - Check **Enable OAuth Settings**
   - **Callback URL:** `https://app.thalian.ai/api/salesforce-callback`
   - **Selected OAuth Scopes** — add the following:
     - `Access and manage your data (api)`
     - `Perform requests at any time (refresh_token, offline_access)`
     - `Access your basic information (id, profile, email, address, phone)`
5. Click **Save** — Salesforce will take a few minutes to register the app

---

## Step 2 — Copy your credentials

1. After saving, click **Manage Consumer Details** (you may need to verify your identity)
2. Copy the **Consumer Key** (this is your Client ID)
3. Copy the **Consumer Secret** (this is your Client Secret) — store it securely

---

## Step 3 — Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Salesforce** and click **Connect**
3. Paste your **Consumer Key** and **Consumer Secret**
4. Select your instance type: **Production** or **Sandbox**
5. Click **Connect** — you'll be redirected to Salesforce to authorize the connection
6. Click **Allow** on the Salesforce OAuth consent screen
7. You'll be redirected back to Thalian — the integration is now connected

---

## What Thalian syncs

- **All active users** — user profiles, roles, login history, and profile type (System Administrator vs. standard user)
- **Connected Apps** — OAuth applications authorized by Salesforce users, including the authorizing user's identity
- **IDP gap detection** — each Salesforce user is cross-referenced against your connected IDP by email address

Thalian does not read or sync Salesforce records, opportunities, contacts, or any CRM data. Only user identity and access data is collected.

---

## Remediation

Salesforce is a **read-only integration**. Thalian surfaces findings but does not modify Salesforce user accounts directly. Remediation for Salesforce findings targets the IDP or the Salesforce console:

- **Admin not in IDP / User not in IDP** — remediate by suspending the account in Salesforce manually, or by provisioning the user in your IDP
- **Stale active user** — remediate by deactivating the Salesforce user in Setup → Users
- **Connected app by unknown user** — revoke the app authorization in Salesforce Setup → Connected Apps → OAuth Connected Apps Usage

---

## Troubleshooting

- **OAuth error during connect:** Ensure the Callback URL in your Connected App exactly matches `https://app.thalian.ai/api/salesforce-callback`
- **No users found:** Confirm the `api` scope is included in your Connected App's OAuth scopes
- **Sandbox vs. Production mismatch:** If you connected a Sandbox, ensure you selected "Sandbox" in the Thalian connection form — the OAuth endpoints differ
- **Connected App not immediately available:** Salesforce takes up to 10 minutes to activate a newly created Connected App

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
