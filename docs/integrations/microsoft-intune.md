# Connect Microsoft Intune

Step-by-step guide to connecting Microsoft Intune to Thalian for endpoint management intelligence.

---

## Prerequisites

- **Microsoft 365 tenant** with Intune licenses assigned
- **Intune Administrator** or **Global Reader** role to authorize the OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Microsoft Intune** and click **Connect**
3. Click **Authorize with Microsoft**
4. Sign in with your Microsoft admin account
5. Review the requested permissions — Thalian requests read-only scopes for device management data
6. Click **Accept** to grant consent
7. You'll be redirected back to Thalian — the integration is now connected

## Requested Permissions

Intune shares the Microsoft OAuth consent with Entra ID. The scope specific to Intune is `DeviceManagementManagedDevices.Read.All`, which pulls managed device inventory for endpoint posture checks. For the full list of Microsoft scopes, see [Connect Microsoft Entra ID](./microsoft-entra-id.md).

## Alternative: API Credentials

If your organization restricts OAuth consent flows:

1. Register an application in **Entra ID** → **App registrations**
2. Grant the application `DeviceManagementManagedDevices.Read.All` permissions (application type)
3. Create a **client secret**
4. In Thalian, select the **API** connection method
5. Enter your **Tenant ID**, **Client ID**, and **Client Secret**
6. Click **Save**

## What Thalian Syncs

- **Devices** — managed devices including OS, model, and enrollment status
- **Compliance status** — per-device compliance state and policy violations
- **Configurations** — device configuration profiles and their assignment status

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
