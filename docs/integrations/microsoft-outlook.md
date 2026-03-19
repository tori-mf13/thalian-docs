# Connect Microsoft Outlook

Step-by-step guide to connecting Microsoft Outlook to Thalian for email security intelligence.

---

## Prerequisites

- **Microsoft 365 tenant** with Exchange Online
- **Global Reader** or **Exchange Administrator** role to authorize the OAuth consent

## Connect via OAuth

1. Go to **Integrations** → **Browse**
2. Find **Microsoft Outlook** and click **Connect**
3. Click **Authorize with Microsoft**
4. Sign in with your Microsoft admin account
5. Review the requested permissions — Thalian requests read-only scopes for mailbox configuration data
6. Click **Accept** to grant consent
7. You'll be redirected back to Thalian — the integration is now connected

### What Permissions Are Requested

Thalian requests read-only access to mailbox settings and mail flow rules. It does **not** read email content or attachments.

## What Thalian Syncs

- **Mailbox monitoring** — mailbox configurations and delegation settings
- **Forwarding rule detection** — inbox rules that forward mail externally, which can indicate compromised accounts or data exfiltration

## Troubleshooting

- **Insufficient permissions:** The authorizing account must have Exchange admin or Global Reader permissions
- **Missing mailboxes:** Ensure the connected tenant includes the Exchange Online licenses for the mailboxes you expect to see

---

*For a full list of supported platforms, see [Integrations Guide](../integrations-guide.md).*
