# API Reference

Thalian exposes a set of backend API endpoints via Cloudflare Pages Functions. All endpoints require authentication and are scoped to your workspace.

---

## Authentication

Every API request must include a valid Supabase session token in the `Authorization` header:

```
Authorization: Bearer <your-session-token>
```

Tokens are issued by Supabase Auth on login. If your workspace has **IP allowlisting** enabled in **Settings** → **Security**, requests from non-allowed IPs are rejected.

## Authorization

All endpoints enforce role-based access control. The backend calls `verifyPermission()` on every request, checking both workspace membership and role-specific permissions before processing. Unauthorized requests receive a `403` response with no internal details.

For a full breakdown of role permissions, see [Settings & Admin](./settings-and-admin.md).

## Base URL

All API endpoints are served from:

```
https://app.thalian.ai/api/
```

## MCP API (API key auth)

Thalian exposes a separate set of endpoints under `/api/mcp/` that accept API keys instead of Supabase session tokens. These are designed for programmatic access from external tools like Claude Code via the [MCP server](./mcp-server.md).

### API key authentication

Generate a key in **Settings → API Keys**. Pass it as a Bearer token:

```
Authorization: Bearer thal_your_key_here
```

API keys are workspace-scoped and read-only by default. They do not require Supabase Auth and work from any environment that can reach `app.thalian.ai`.

### MCP endpoints

All MCP endpoints accept an optional `workspaceId` query parameter. If omitted, the workspace associated with the API key is used.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/mcp/risk-score` | Risk score (0–100), severity breakdown, top 5 open findings |
| `GET` | `/api/mcp/findings` | Open findings — filterable by `severity`, `category`, `limit` (max 100) |
| `GET` | `/api/mcp/identity` | Identity details by `email` — status, MFA, app access, linked findings |
| `GET` | `/api/mcp/integrations` | Connected platforms and sync status |
| `GET` | `/api/mcp/posture-summary` | Plain-language executive summary with key metrics |
| `POST` | `/api/mcp/sync` | Trigger a background sync for all connected integrations |

### API key management

| Method | Path | Description | Min Role |
|---|---|---|---|
| `POST` | `/api/api-keys` | Create a new API key (returned once in plaintext) | Admin |
| `GET` | `/api/api-keys` | List active keys (prefix and metadata only — hash never returned) | Admin |
| `DELETE` | `/api/api-keys?id=<key_id>` | Revoke a key immediately | Admin |

---

## Endpoints

### Health

| Method | Path | Description | Min Role |
|---|---|---|---|
| `GET` | `/api/health` | Check platform and database connectivity | — (public) |

### Analysis

| Method | Path | Description | Min Role |
|---|---|---|---|
| `POST` | `/api/analyze` | Trigger an analysis run for the workspace | Agent |

### AI Chat

| Method | Path | Description | Min Role |
|---|---|---|---|
| `POST` | `/api/ai-chat` | Send a message to the AI assistant with workspace context | Viewer |

The AI chat endpoint includes relevant workspace data (findings, identities, applications, devices, entitlements) in the prompt context. Responses are scoped to your workspace — no cross-tenant data is included.

### Integrations

| Method | Path | Description | Min Role |
|---|---|---|---|
| `POST` | `/api/connect-integration` | Connect a new integration with credentials | Admin |
| `POST` | `/api/sync-integration` | Trigger a manual sync for a connected integration | Admin |
| `POST` | `/api/disconnect-integration` | Remove an integration from the workspace | Admin |

Integration credentials are encrypted with AES-256-GCM before storage. OAuth flows redirect through the provider's consent screen and return tokens to the backend — plaintext credentials are never exposed to the frontend.

### Remediation

| Method | Path | Description | Min Role |
|---|---|---|---|
| `POST` | `/api/execute-action` | Execute a remediation action against a target platform | Agent |

Actions initiated by Agents on high or critical severity findings enter a pending approval queue. Security Analysts, Admins, and Super Admins can execute without a second approver.

### Export

| Method | Path | Description | Min Role |
|---|---|---|---|
| `GET` | `/api/export-audit-log` | Export the full audit log as JSON | Auditor |
| `GET` | `/api/export-workspace` | Export all workspace data as JSON | Admin |

### Billing

| Method | Path | Description | Min Role |
|---|---|---|---|
| `POST` | `/api/create-checkout` | Create a Stripe checkout session for plan upgrade | Admin |
| `POST` | `/api/create-portal-session` | Open the Stripe customer portal for billing management | Admin |

## Request Format

All `POST` endpoints accept JSON request bodies. Every request must include a `workspaceId` field:

```
{
  "workspaceId": "your-workspace-id",
  ...
}
```

The backend verifies that the authenticated user is a member of the specified workspace before processing any query.

## Error Handling

API errors return standard HTTP status codes:

| Code | Meaning |
|---|---|
| `400` | Invalid request body or missing required fields |
| `401` | Missing or invalid session token |
| `403` | Insufficient role permissions or IP not allowlisted |
| `404` | Resource not found within workspace scope |
| `429` | Rate limit exceeded |
| `500` | Internal server error (no details exposed) |

Error responses are sanitized — no stack traces, internal paths, or credential fragments are included.

## Rate Limiting

AI chat requests are subject to daily limits based on your plan:

| Plan | AI Queries Per Day |
|---|---|
| **Free** | 25 |
| **Pro** | 100 |
| **Enterprise** | Unlimited |

## Security Headers

All API responses include the following security headers:

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |

---

*For information on the data Thalian collects from connected platforms, see [Integrations Guide](./integrations-guide.md).*
