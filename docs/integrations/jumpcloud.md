# Connect JumpCloud

Step-by-step guide to connecting JumpCloud to Thalian for identity and device intelligence.

---

## Prerequisites

- **JumpCloud admin account** with permissions to create API keys
- **JumpCloud organization ID** — found in **Settings** → **General** in the JumpCloud admin console

## Create an API Key in JumpCloud

1. Sign in to the JumpCloud admin console
2. Click your **admin avatar** in the top-right corner
3. Select **My API Key**
4. Copy the API key value

!!! warning "API key scope"
    The API key has the same permissions as the admin account. Use an account with read-only admin access where possible.

## Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **JumpCloud** and click **Connect**
3. Enter your **API key**
4. Enter your **Organization ID**
5. Click **Save** — Thalian validates the credentials and begins the first sync

## What Thalian Syncs

- **Users** — full directory including status, MFA enrollment, and last login
- **Devices** — bound systems, OS versions, and agent status
- **Systems** — system inventory and associations
- **Policies** — applied policies and compliance state

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
