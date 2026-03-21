# SSO / SAML Setup Guide

Configure SAML 2.0 single sign-on so your team signs into Thalian through your corporate identity provider.

!!! info "Enterprise plan required"
    SSO is available on the Enterprise plan. [Contact sales](mailto:sales@thalian.ai) to upgrade.

---

## Overview

Thalian supports SAML 2.0 SSO via Supabase's native SAML implementation. Once configured:

- Team members sign in at [app.thalian.ai](https://app.thalian.ai) and click **Sign in with SSO**
- They enter their work email — Thalian detects the domain and redirects to your IdP
- After authenticating at your IdP, they land in Thalian automatically
- New users are provisioned with **Viewer** access and can be promoted by an admin

Both **SP-initiated** (user starts at Thalian) and **IdP-initiated** (user clicks Thalian tile in Okta/Azure/etc.) flows are supported.

---

## Step 1 — Configure Thalian as a SAML Application in Your IdP

You need to register Thalian in your identity provider before connecting it in Settings. Use the values below when your IdP asks for SP (Service Provider) details.

| Field | Value |
|---|---|
| **ACS URL** | `https://auth.thalian.ai/auth/v1/sso/saml/acs` |
| **Entity ID / Audience URI** | `https://auth.thalian.ai/auth/v1/sso/saml/metadata` |
| **Name ID format** | `EmailAddress` |
| **Binding** | `HTTP-POST` |

### Okta

1. In Okta Admin, go to **Applications** → **Create App Integration**
2. Choose **SAML 2.0**
3. Set the **Single sign-on URL** (ACS URL) and **Audience URI** to the values above
4. Under **Attribute Statements**, map `email` to `user.email`
5. Complete setup and go to the app's **Sign On** tab → **SAML Setup** → copy the **Metadata URL** (ends in `/sso/saml/metadata`)
6. Assign the app to the users or groups who should have Thalian access

### Microsoft Entra ID (Azure AD)

1. In Entra ID, go to **Enterprise Applications** → **New application** → **Create your own application**
2. Choose **Integrate any other application you don't find in the gallery (Non-gallery)**
3. Go to **Single sign-on** → **SAML**
4. Set **Identifier (Entity ID)** and **Reply URL (ACS URL)** to the values above
5. Under **Attributes & Claims**, ensure `user.userprincipalname` maps to the Name ID (email format)
6. Copy the **App Federation Metadata Url** from the SAML Certificates section
7. Assign users or groups to the application

### Google Workspace

1. In Google Admin, go to **Apps** → **Web and mobile apps** → **Add app** → **Add custom SAML app**
2. Name the app `Thalian`
3. Copy the **SSO URL** and **Certificate** (you won't need these — Thalian uses the metadata URL)
4. Click **Continue** → enter the **ACS URL** and **Entity ID** from the table above
5. Set **Name ID format** to `EMAIL` and **Name ID** to `Basic Information > Primary email`
6. The metadata URL format for Google is: `https://accounts.google.com/o/saml2/idp?idpid=YOUR_IDP_ID` — find your IDP ID in Google Admin under **Security** → **Set up single sign-on (SSO) with a third-party IdP**

---

## Step 2 — Connect SSO in Thalian Settings

1. Go to **Settings** → **Security** → **Access**
2. Find the **SSO / SAML** card
3. Paste your IdP's **Metadata URL** into the *IdP Metadata URL* field
4. Enter your organization's **email domain** (e.g., `company.com`) — this is the domain used to route sign-ins
5. Click **Configure SSO**

Thalian will fetch your IdP's metadata, register the SAML provider, and confirm the connection. The card will switch to a **Configured** state showing your domain.

---

## Step 3 — Verify the Connection

**SP-initiated (recommended for testing):**

1. Open a private/incognito browser window
2. Go to [app.thalian.ai/login](https://app.thalian.ai/login)
3. Click **Sign in with SSO**
4. Enter your work email (e.g., `you@company.com`)
5. You should be redirected to your IdP's login page
6. After authenticating, you should land on the Thalian dashboard

**IdP-initiated:**

1. Click the Thalian tile in your IdP's app launcher (Okta dashboard, Azure MyApps, etc.)
2. You should land directly in the Thalian dashboard without being prompted to log in again

---

## User Provisioning

SSO users are provisioned automatically on first sign-in:

- A Thalian account is created for them
- They are added to your workspace with **Viewer** access
- An admin or super admin can promote them to a higher role in **Settings** → **Team**

!!! note "Role sync (SCIM)"
    Automatic role sync from your IdP requires SCIM, which is on the roadmap. Today, role assignment is manual after first sign-in.

---

## Troubleshooting

**"No SSO configured for this domain"**
: The domain you entered doesn't match any configured SSO provider. Double-check the email domain in Settings matches the domain your team uses.

**Redirect loop after authentication**
: Check that the ACS URL in your IdP matches exactly: `https://auth.thalian.ai/auth/v1/sso/saml/acs`. Trailing slashes or HTTP (not HTTPS) will break the flow.

**User lands at login page after IdP auth**
: This usually means the Name ID attribute isn't being sent as an email address. In your IdP, confirm the Name ID format is set to `EmailAddress` and maps to the user's primary email.

**User authenticated but no workspace access**
: The email domain on the user's IdP account must match the domain registered in Thalian. If a user has a different email format in your IdP, they won't be routed to your workspace.

**Metadata URL fetch failed**
: The metadata URL must be publicly reachable over HTTPS. If your IdP is behind a firewall or VPN, you'll need to allowlist Cloudflare's egress IPs or use a static metadata XML upload (contact support).

---

## SP Metadata Reference

These values are also shown in **Settings → Security → Access** after SSO is configured.

| Field | Value |
|---|---|
| ACS URL | `https://auth.thalian.ai/auth/v1/sso/saml/acs` |
| Entity ID / Metadata URL | `https://auth.thalian.ai/auth/v1/sso/saml/metadata` |
| Binding | `HTTP-POST` |
| Name ID Format | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` |
