# Connect GitHub

Step-by-step guide to connecting a GitHub organization to Thalian for developer access intelligence and identity gap detection.

---

## What Thalian detects

Thalian cross-references GitHub organization members and outside collaborators against your corporate identity provider (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) to surface access that exists outside your IDP lifecycle:

- **Outside collaborator with write access** — an external user has write or admin access to one or more repositories (high)
- **Org owner not in IDP** — a GitHub organization owner has no matching account in your IDP, meaning their access is invisible to your offboarding workflow (critical)
- **Outside collaborator count** — tracks the total number of external collaborators across your organization as a posture signal (medium)

---

## Prerequisites

- **GitHub organization** — Thalian connects at the org level, not the individual user level
- **Org owner account** — you must authorize Thalian as a GitHub org owner to grant the necessary OAuth scopes

---

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **GitHub** and click **Connect**
3. Click **Authorize with GitHub**
4. Sign in to GitHub if prompted
5. Select the **organization** you want to connect — you must be an owner of the org to grant access
6. Review the requested permissions and click **Authorize**
7. You'll be redirected back to Thalian — the integration is now connected and the first sync begins

---

## Requested Permissions

| Scope | Justification |
|---|---|
| `read:org` | Reads org members, teams, and outside collaborators for identity sync |
| `read:user` | Reads user profile and email address for IDP matching |

### Enabling remediation actions

By default, Thalian connects with read-only scopes. To enable remediation actions (removing outside collaborators, removing org members), you need to re-authorize with the additional `write:org` scope:

1. Open the GitHub integration card in **Integrations**
2. Click **Edit credentials** → **Re-authorize**
3. Review the updated permissions — Thalian will request `write:org` in addition to the read scopes
4. Click **Authorize**

Thalian will only use write permissions when a remediation action is explicitly initiated or approved by your team.

---

## What Thalian syncs

- **Organization members** — all current members with their role (member or owner), email address, and last activity
- **Outside collaborators** — external users with repository access, including which repos and their permission level (read, write, admin)
- **IDP gap detection** — each member and collaborator is cross-referenced against your connected IDP to identify accounts outside the corporate directory

GitHub usernames are matched to IDP accounts by email address. For members whose GitHub email is private or doesn't match their corporate email, Thalian attempts a username match as a fallback.

---

## Troubleshooting

- **Organization not listed during OAuth:** Ensure you are an owner of the org. Members cannot grant org-level OAuth access
- **Missing outside collaborators:** Confirm the `read:org` scope was granted — this scope is required to list collaborators
- **IDP gaps not detected:** Ensure at least one IDP (Okta, Entra ID, Google Workspace, JumpCloud, or OneLogin) is connected and synced. Thalian requires IDP data to perform the cross-reference
- **Remediation actions unavailable:** Re-authorize with `write:org` scope as described above

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
