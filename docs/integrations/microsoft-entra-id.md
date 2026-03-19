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
