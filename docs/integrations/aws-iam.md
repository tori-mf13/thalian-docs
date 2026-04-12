# Connect AWS IAM

Step-by-step guide to connecting AWS Identity and Access Management to Thalian for cloud identity gap detection.

---

## What Thalian detects

Thalian cross-references every AWS IAM user against your corporate identity provider (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) and analyzes your AWS account security configuration for 11 detection rules total:

**IDP gap detection:**

- **AWS admin not in IDP** — IAM users with AdministratorAccess or PowerUserAccess not in your IDP (critical)
- **AWS user not in IDP** — any IAM user not present in your IDP (high)
- **IAM user without MFA** — console users with no MFA device enrolled (high)
- **Stale IAM user** — IAM user whose IDP account is suspended or deprovisioned (high)

**Access key hygiene:**

- **Stale access key** — IAM user has an active access key not used in 90+ days (high)
- **Multiple active access keys** — IAM user has more than one active access key (medium)
- **Access key not rotated** — active access key older than 90 days (medium)

**Root account analysis:**

- **Root account without MFA** — the AWS root account has no MFA device enrolled (critical)
- **Root account recently used** — the root account has been used recently (high)

**IAM role trust policy:**

- **Wildcard trust principal** — an IAM role trust policy grants `sts:AssumeRole` to `*` (critical)
- **Cross-account trust without condition** — a role can be assumed by any principal in another AWS account without an `ExternalId` or condition constraint (high)

AWS IAM does not auto-sync with corporate directories. When an employee leaves and their Okta or Entra account is disabled, their IAM user and access keys remain active until explicitly deleted.

---

## Prerequisites

- AWS account with permission to create IAM users and policies
- An existing IAM user or the ability to create one for Thalian's read-only access

---

## Step 1 — Create a read-only IAM user for Thalian

Thalian connects using an IAM access key. Create a dedicated user with read-only permissions.

1. Sign in to the [AWS IAM console](https://console.aws.amazon.com/iam/)
2. Go to **Users** → **Create user**
3. Username: `thalian-readonly` (or any name you prefer)
4. Select **Next** (no console access needed — programmatic access only)

---

## Step 2 — Attach the required policy

Attach a policy that grants read-only access to IAM and STS:

**Option A — Use the AWS managed policy (recommended)**

Attach the `SecurityAudit` or `ReadOnlyAccess` managed policy:

1. On the **Set permissions** step, choose **Attach policies directly**
2. Search for `SecurityAudit` and select it
3. Click **Next** → **Create user**

**Option B — Create a minimal custom policy**

If you prefer a tighter permission set, create a custom policy with only what Thalian needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:GetAccountAuthorizationDetails",
        "iam:ListVirtualMFADevices",
        "iam:GenerateCredentialReport",
        "iam:GetCredentialReport",
        "iam:GetAccountSummary",
        "iam:ListRoles",
        "iam:GetRole",
        "cloudtrail:LookupEvents",
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Step 3 — Create an access key

1. Go to the user you just created → **Security credentials** tab
2. Under **Access keys**, click **Create access key**
3. Use case: **Third-party service**
4. Click **Next** → **Create access key**
5. Copy the **Access Key ID** and **Secret Access Key** — the secret is shown only once

---

## Step 4 — Connect in Thalian

1. Go to **Integrations** → **Browse**
2. Find **AWS IAM** and click **Connect**
3. Enter your **Access Key ID** and **Secret Access Key**
4. Optionally enter a **Region** (default: `us-east-1` — IAM is a global service so region only affects the API endpoint)
5. Click **Connect** — Thalian validates the credentials and begins the first sync

---

## What Thalian syncs

- **All IAM users** in the account via `GetAccountAuthorizationDetails`
- **Admin detection** — users with `AdministratorAccess` or `PowerUserAccess` attached directly or via group
- **MFA enrollment** — whether each user has a virtual MFA device assigned
- **Last login** — `PasswordLastUsed` timestamp for console access activity
- **Group membership** — which IAM groups each user belongs to (used for admin detection)
- **IAM Credential Report** — access key ages, rotation dates, last-used timestamps, and multi-key detection across all IAM users
- **Root account status** — root MFA enrollment via `GetAccountSummary`; recent root account activity via CloudTrail `LookupEvents`
- **IAM role trust policies** — trust policy principals and conditions for all roles, to detect wildcard or unconstrained cross-account trust

Service accounts and roles are not synced as identities — only human IAM users.

---

## IAM username matching

AWS IAM usernames are often not email addresses. Thalian matches IAM users to your corporate IDP using:

1. **Direct email match** — if the IAM username contains `@`, it's treated as an email and matched against IDP accounts
2. **Username match** — if the username doesn't contain `@`, Thalian checks it against IDP usernames directly

For best results, set IAM usernames to match corporate email addresses (e.g., `jane.doe@company.com`). This enables precise IDP gap detection and stale user alerts.

---

## Troubleshooting

- **Invalid credentials:** Confirm the Access Key ID starts with `AKIA` (long-term key) and the secret was copied without extra whitespace
- **Access denied errors:** Ensure the IAM user has the `SecurityAudit` policy or the custom policy with `iam:GetAccountAuthorizationDetails`, `iam:ListVirtualMFADevices`, and `sts:GetCallerIdentity` actions
- **No users found:** The access key must belong to an IAM user in the account you want to monitor. Cross-account access requires additional IAM role configuration not currently supported
- **Key rotation:** If you rotate the access key, update the credentials in Thalian under **Integrations** → the AWS IAM integration → **Edit credentials**

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
