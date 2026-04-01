# Connect Azure IAM

Step-by-step guide to connecting Azure RBAC to Thalian for cloud identity gap detection across your Azure subscriptions.

---

## What Thalian detects

Thalian cross-references Azure RBAC role assignments across all your subscriptions against your corporate identity provider (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) to surface access that exists outside your IDP lifecycle:

- **Azure Owner/Contributor not in IDP** — a subscription Owner or Contributor has no matching corporate identity (critical)
- **Azure member not in IDP** — any user with an Azure role assignment has no matching IDP account (high)
- **Stale role assignment** — an Azure member whose IDP account is suspended or deprovisioned still holds an active RBAC role (high)
- **Service principal with Owner role** — a service principal holds the Owner or User Access Administrator role, enabling lateral movement (critical)

Azure RBAC does not auto-sync with corporate directories. When an employee leaves and their Okta or Entra account is disabled, their Azure subscription access remains active until explicitly removed.

---

## Prerequisites

- **Microsoft Azure account** with at least one active subscription
- **Reader** role (or higher) on the subscriptions you want Thalian to monitor
- The account used to authorize must have access to both Azure Management and Microsoft Graph

---

## Connect via OAuth

Azure IAM uses the same Microsoft OAuth consent flow as Entra ID, but requests additional Azure Management scopes.

1. Go to **Integrations** → **Browse**
2. Find **Azure IAM** and click **Connect**
3. Click **Authorize with Microsoft** — you'll be redirected to Microsoft's consent screen
4. Sign in with an account that has Reader access to your Azure subscriptions
5. Review the requested permissions and click **Accept**
6. Thalian validates the connection, counts your enabled subscriptions, and begins the first sync

---

## Requested Permissions

| Scope | Justification |
|---|---|
| `https://management.azure.com/user_impersonation` | Reads Azure subscriptions and RBAC role assignments across all projects |
| `User.Read.All` | Resolves Azure user principal IDs to email addresses via Microsoft Graph for IDP matching |
| `Directory.Read.All` | Reads directory data to enrich user profiles and detect service principals |
| `offline_access` | Allows background sync via token refresh without re-prompting |
| `openid` | Standard OIDC — extracts tenant ID from the identity token |
| `profile` | Returns the authorizing user's display name during connect |
| `email` | Returns the authorizing user's email during connect |

---

## What Thalian syncs

- **All enabled Azure subscriptions** visible to the connected account
- **RBAC role assignments** at subscription scope — who holds which roles on which subscriptions
- **User principals** — resolved to email addresses via Microsoft Graph for IDP cross-reference
- **Service principals** — flagged when holding Owner or User Access Administrator roles
- **Deduplication** — the same principal across multiple subscriptions is consolidated into a single identity with aggregated roles

Groups and foreign groups are skipped — Thalian detects individual identities, not group containers.

---

## Remediation

Azure IAM is a **read-only integration**. Thalian surfaces findings but does not modify Azure role assignments directly. Remediation targets the Azure Portal:

- **Owner/member not in IDP** — remove the role assignment in Azure Portal → Subscriptions → Access control (IAM)
- **Stale role assignment** — remove the assignment for the offboarded user
- **Service principal with Owner** — review and downgrade the service principal's role in Azure Portal

---

## Troubleshooting

- **No subscriptions found:** The connected account must have at least Reader access on the subscriptions you want monitored
- **Personal Microsoft account blocked:** Azure IAM requires a work/school account — personal Microsoft accounts (outlook.com, hotmail.com) are not supported
- **Missing user emails:** Some Azure user principals may not have an email address resolvable via Graph. These appear with their principal ID instead
- **IDP gaps not detected:** Ensure at least one IDP (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) is connected and synced

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
