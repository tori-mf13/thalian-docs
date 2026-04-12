# MCP Server

Thalian exposes a hosted MCP (Model Context Protocol) server at `mcp.thalian.ai`, letting any MCP-compatible AI assistant query your workspace security data directly.

---

## What is MCP?

MCP is an open protocol that lets AI tools call external services as structured tools. When connected to Thalian's MCP server, your AI assistant can answer questions like "What's our risk score?" or "Show me all critical findings" by pulling live data from your workspace.

## Available tools

| Tool | Description |
|---|---|
| `get_risk_score` | Workspace risk score (0–100), severity breakdown, and top 5 open findings |
| `list_findings` | Open findings, filterable by severity or category |
| `lookup_identity` | Look up a user by email across all connected platforms |
| `get_integrations` | All integrations and their connection and sync status |
| `get_posture_summary` | Plain-text summary: risk grade, MFA/SSO coverage, top risk areas |
| `trigger_sync` | Trigger a sync across all connected integrations |

## Setup

### 1. Create an API key

Go to **Settings** → **API Keys** and create a new key. Give it a descriptive name (e.g. "Claude Code" or "Cursor") and copy the key — it's only shown once.

You must have the **Admin** role or above to create API keys.

### 2. Add to your MCP client config

The connection config is the same for all MCP clients. Replace `thal_your_key_here` with your key:

```json
{
  "mcpServers": {
    "thalian": {
      "type": "http",
      "url": "https://mcp.thalian.ai",
      "headers": {
        "X-Api-Key": "thal_your_key_here"
      }
    }
  }
}
```

**Config file locations by client:**

| Client | Config file |
|---|---|
| Claude Code | `~/.claude/claude_desktop_config.json` |
| Cursor | `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` globally |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Other clients | Check your client's MCP documentation |

### 3. Restart your AI client

After saving the config, restart the client. You can verify the connection is working by asking:

> *"What's my Thalian risk score?"*

## API keys

- Each workspace can have up to 10 active API keys
- Keys are scoped to your workspace — they can only read data from the workspace they were created in
- Keys can be revoked at any time from **Settings** → **API Keys**
- The full key value is only shown once at creation — store it securely

## Troubleshooting

**"Invalid API key" (401)**
The key may have been revoked or copied incorrectly. Revoke it in Settings and create a new one.

**Tools don't appear in your AI client**
Restart the client after editing the config file. Check that the JSON is valid (no trailing commas).

**"Unauthorized" on trigger_sync**
Ensure your key was created in the correct workspace.

## Security

API keys are hashed with SHA-256 before storage. Thalian never stores the raw key value. All MCP endpoints are read-only — no key can modify workspace data.

---

*For full API documentation including REST endpoints, see [API Reference](./api-reference.md).*
