# Connect Google Cloud IAM

Step-by-step guide to connecting Google Cloud Platform IAM to Thalian for cloud identity gap detection.

---

## What Thalian detects

Thalian cross-references every GCP project member against your corporate identity provider (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) to find access that exists outside your IDP lifecycle controls:

- **GCP owner/editor not in IDP** — privileged project members with no corporate identity (critical)
- **GCP member not in IDP** — any human member not present in your IDP (high)
- **Public IAM binding** — `allUsers` or `allAuthenticatedUsers` binding exposing resources to the internet (critical)
- **Stale IAM binding** — GCP member whose IDP account is suspended or deprovisioned (high)
- **Owner role sprawl** — a project has more Owner-role members than expected (high)
- **Service account with admin role** — a service account holds an admin-level IAM role (high)
- **Cross-project admin** — a user has admin access across 3+ projects (high)
- **Editor role overuse** — more than 50% of a project's members have Editor or higher (medium)

GCP IAM does not auto-sync with corporate directories. When an employee leaves and their Okta or Entra account is disabled, their GCP project access remains active until explicitly removed.

---

## Prerequisites

- A Google Cloud account with at least one active project
- Permission to create OAuth credentials in Google Cloud Console
- The **Cloud Resource Manager API** and **IAM API** enabled in your project

---

## Step 1 — Enable required APIs

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Library**
4. Search for and enable:
   - **Cloud Resource Manager API**
   - **Identity and Access Management (IAM) API**

---

## Step 2 — Create an OAuth client

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Thalian GCP IAM` (or any name you prefer)
5. Under **Authorized redirect URIs**, add:
   ```
   https://app.thalian.ai/api/oauth-callback
   ```
6. Click **Create** — copy the **Client ID** and **Client Secret**

---

## Step 3 — Add the required scope

1. Go to **APIs & Services** → **Data Access** (or **OAuth consent screen** → **Scopes**)
2. Click **Add or remove scopes**
3. Add the following scopes:
   ```
   https://www.googleapis.com/auth/cloud-platform.read-only
   openid
   email
   ```
4. Save

> **Note:** If your Google Workspace organization is set to **Internal**, only users in your org can authorize. For a managed deployment, this is the correct setting — Thalian will connect using your admin account.

---

## Step 4 — Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **Google Cloud IAM** and click **Connect**
3. Click **Connect with Google** — you'll be redirected to Google's OAuth consent screen
4. Sign in with the Google account that has access to your GCP projects
5. Approve the requested permissions
6. Thalian validates the connection and begins the first sync

---

## What Thalian syncs

- **All active GCP projects** visible to the connected account
- **IAM project members** — human users (`user:`) and service accounts (`serviceAccount:`)
- **Role assignments** — which roles each member holds across which projects
- **Public bindings** — `allUsers` and `allAuthenticatedUsers` entries flagged immediately

Groups (`group:`) are skipped — Thalian detects individual identities, not group containers.

---

## Permissions required

The connected Google account needs at minimum:

| Permission | Purpose |
|------------|---------|
| `resourcemanager.projects.list` | Discover all active projects |
| `resourcemanager.projects.getIamPolicy` | Read IAM policies per project |

Both are included in the `cloud-platform.read-only` scope. The `Viewer` role on each project or at the organization level is sufficient.

---

## Troubleshooting

- **No projects found:** The connected account must have at least `Viewer` access on the projects you want monitored. Grant it at the organization or folder level for full coverage.
- **APIs not enabled:** If the sync returns an API error, confirm the Cloud Resource Manager API is enabled in the project where your OAuth credentials were created.
- **Scope error on OAuth:** Ensure `cloud-platform.read-only` has been added to the OAuth consent screen scopes before connecting.
- **Consent screen in testing mode:** If your OAuth app is in "Testing" status, only explicitly added test users can authorize. Publish the app or add your account as a test user.

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
