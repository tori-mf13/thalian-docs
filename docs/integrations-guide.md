# Integrations Guide

Thalian's intelligence comes from the data it collects across your IT stack. The more platforms you connect, the more cross-platform insights Thalian can surface — things no single tool can see on its own.

---

## Supported Platforms

Thalian supports 24 platforms across 7 categories:

### Identity & Access
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **Okta** | API token | Users, groups, MFA status, apps, system log events |
| **Microsoft Entra ID** | OAuth or API | Users, groups, sign-in logs, enterprise apps, conditional access |
| **Google Workspace** | OAuth | Users, groups, OAuth apps, Gmail app discovery, audit events |
| **JumpCloud** | API key | Users, devices, systems, policies |
| **OneLogin** | Client credentials | Users, apps, roles |

### Endpoint Management
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **Microsoft Intune** | OAuth or API | Devices, compliance status, configurations |
| **Jamf Pro** | API credentials | Mac/iOS devices, compliance, configurations |
| **Kandji** | API token | Apple devices, blueprints, compliance |
| **Hexnode** | API key | Cross-platform devices, policies |

### Security
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **CrowdStrike** | API credentials | Endpoints, detections, containment status |
| **SentinelOne** | API token | Agents, threats, device health |

### Network
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **Cisco Meraki** | API key | Network devices, clients, VPN status |

### ITSM (IT Service Management)
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **Jira** | OAuth or API | Issues, users, service desk tickets |
| **Jira Service Management** | OAuth or API | Service requests, agents, queues |
| **ServiceNow** | API credentials | Incidents, users, CMDB items |
| **Freshservice** | API key | Tickets, agents, assets |
| **Zendesk** | API token | Tickets, users, organizations |

### Communication
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **Slack** | OAuth or bot token | Used for alert delivery (finding notifications to channels) |
| **Microsoft Teams** | OAuth or webhook | Used for alert delivery (adaptive card notifications) |
| **Microsoft Outlook** | OAuth | Mailbox monitoring, forwarding rule detection |

### Collaboration
| Platform | Auth Method | What It Syncs |
|---|---|---|
| **SharePoint** | OAuth | Sites, external sharing, document permissions |
| **Confluence** | OAuth or API | Spaces, external sharing, content exposure |

## Connecting an Integration

### OAuth Platforms (Google Workspace, Entra ID, Intune, Slack, Jira, etc.)

1. Go to **Integrations** in the sidebar
2. Click **Browse** to open the integration library, or find the platform card
3. Click **Connect**
4. You'll be redirected to the platform's consent screen
5. Authorize the requested permissions (Thalian requests read-only scopes)
6. You'll be redirected back to Thalian — the integration is now connected

**Note:** Some OAuth platforms may not grant all requested scopes. Thalian detects this and shows a warning about which features are degraded. You can reconnect to grant additional scopes at any time.

### API Key Platforms (Okta, JumpCloud, CrowdStrike, etc.)

1. Go to **Integrations** → **Browse**
2. Find the platform and click **Connect**
3. Enter the required credentials (API token, domain, etc.)
4. Click **Save** — Thalian validates the credentials and connects

**Credentials are encrypted** at rest before storage and are never exposed in plaintext.

## Syncing Data

### Manual Sync

Click the **Sync** button on any integration card to trigger an immediate data pull. The sync status shows real-time progress.

### Automatic Sync

Connected integrations are synced automatically on a regular schedule without any manual intervention.

### What Happens During a Sync

1. Thalian pulls the latest data from the platform's API
2. New records are inserted; changed records are updated; removed records are deleted
3. The sync engine diffs incoming data against existing records — only changed rows are touched
4. After sync, the analysis engine runs automatically to generate new findings

## Alert Rules

For communication platforms (Slack, Teams) and ITSM platforms (Jira, ServiceNow, Freshservice, Zendesk), you can configure alert rules:

- **Toggle alerts on/off** directly from the integration card
- When enabled, new findings above a configured severity threshold are automatically sent to the connected channel or ticketing system
- Slack and Teams receive formatted messages; ITSM platforms get tickets created automatically

## Plan Limits

The Free plan includes up to 3 integrations and 25 identities. When you exceed the integration limit, the oldest integrations are automatically paused. Upgrade to Pro to reconnect them.

For a full plan comparison, see [Settings & Admin](./settings-and-admin.md).

## Managing Integrations

- **Pause:** Temporarily stop syncing without losing the connection. Data is retained
- **Reconnect:** Re-authorize OAuth or update API credentials if they've expired
- **Disconnect:** Remove the integration entirely. Synced data is retained until the next retention enforcement cycle

## Troubleshooting

- **Sync errors:** Check the integration card for error indicators. Common causes: expired API token, revoked OAuth consent, rate limiting
- **Missing data:** Ensure the API credentials have sufficient permissions. Some platforms require admin-level tokens for full directory access
- **Scope warnings:** If you see "limited scope" warnings after OAuth, reconnect and grant the additional permissions

---

*For information on what Thalian does with your synced data, see [Findings & Remediation](./findings-and-remediation.md).*
