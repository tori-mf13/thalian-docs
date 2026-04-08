# MCP Server

Query your Thalian workspace directly from Claude Code using the Model Context Protocol (MCP).

---

## What this enables

Once configured, you can ask Claude Code questions about your IT environment in plain language:

- "What's our current risk score?"
- "Show me all critical findings"
- "What does alice@company.com have access to?"
- "Which integrations haven't synced recently?"
- "Give me an executive summary of our security posture"
- "Trigger a sync for all integrations"

Claude Code will automatically call the appropriate Thalian tool, retrieve real data from your workspace, and include it in its response.

---

## Setup

### 1. Generate an API key

In Thalian, go to **Settings → API Keys** and create a new key. Give it a descriptive name (for example, "Claude Code"). Copy the full key — it's only shown once.

API keys use the format `thal_` followed by 40 hex characters and are SHA-256 hashed before storage. If you lose the key, revoke it and create a new one.

### 2. Locate the MCP server

The MCP server is included in the Thalian application directory at `mcp-server/index.js`. It requires Node.js 18 or later.

Install its dependencies once:

```sh
cd /path/to/thalian-beta/mcp-server
npm install
```

### 3. Configure Claude Code

Add Thalian to your MCP server configuration. The file location depends on your Claude client:

- **Claude Code CLI:** `~/.claude/claude_desktop_config.json`
- **Claude Desktop (macOS):** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Desktop (Windows):** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "thalian": {
      "command": "node",
      "args": ["/absolute/path/to/thalian-beta/mcp-server/index.js"],
      "env": {
        "THALIAN_API_KEY": "thal_your_key_here"
      }
    }
  }
}
```

Replace `/absolute/path/to/thalian-beta` with the actual path on your machine, and `thal_your_key_here` with the key you generated in step 1.

### 4. Restart Claude Code

Restart Claude Code (or the Claude Desktop app) to pick up the new MCP server configuration.

### 5. Verify

Ask: *"What's my Thalian risk score?"*

You should see the tool execute and return your workspace's current risk score, severity breakdown, and top findings.

---

## Available tools

The MCP server exposes six tools:

| Tool | Description |
|------|-------------|
| **`get_risk_score`** | Returns the workspace risk score (0–100), severity counts, and the top 5 open findings by severity |
| **`list_findings`** | Lists open findings with optional filters: severity (comma-separated), category, and result limit (max 100) |
| **`lookup_identity`** | Looks up a user by email address — returns their status, MFA state, platforms they appear on, app access, and any open findings linked to them |
| **`get_integrations`** | Lists all integrations — platform, category, status, and last sync time |
| **`get_posture_summary`** | Returns a plain-language executive summary: risk score, finding counts, MFA coverage, and top concern |
| **`trigger_sync`** | Triggers a background sync for all connected integrations. Results appear within a few minutes |

All tools accept an optional `workspaceId` parameter. If omitted, the tool defaults to the workspace associated with your API key.

---

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `THALIAN_API_KEY` | Yes | — | API key from **Settings → API Keys** |
| `THALIAN_BASE_URL` | No | `https://app.thalian.ai` | Override for self-hosted or staging environments |

---

## API key management

API keys are managed in **Settings → API Keys**. This tab is visible to workspace admins and super admins.

- **Create** — Enter a name and click **Create key**. The full key is shown once; copy it before dismissing the dialog.
- **List** — Active keys show their display prefix (`thal_xxxxxx…`), creation date, and last used date. The full key hash is never shown.
- **Revoke** — Click **Revoke** next to a key to immediately invalidate it. Revoked keys return `401` on all subsequent requests.

Up to 10 active keys are allowed per workspace.

---

## Security

- Keys are stored as SHA-256 hashes — the plaintext key is never persisted after creation
- Requests are scoped to the issuing workspace; cross-workspace access is not possible
- Keys can be revoked instantly from the Settings UI
- All MCP endpoint calls are read-only by default (`"scope": "read"`)
- The `trigger_sync` tool initiates a sync but does not modify your data directly

---

## Troubleshooting

**"THALIAN_API_KEY environment variable is required"**
The MCP server did not receive the key. Check that the `env` block in your MCP config is correct and the key value starts with `thal_`.

**"Invalid API key" (401)**
The key may have been revoked or the value was truncated. Generate a new key in Settings and update your config.

**"API key not authorized for this workspace" (403)**
The `workspaceId` parameter does not match the workspace tied to your API key. Omit the parameter to use the default workspace, or ensure the correct workspace ID is passed.

**Tools don't appear in Claude Code**
Restart Claude Code after editing the MCP config file. Check the JSON is valid (no trailing commas, properly escaped paths).
