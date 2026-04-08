# serenity-ai-cli

CLI for the [Serenity AI](https://ai.serenity-system.fr) platform — manage conversations, agents, teams, workspaces and more from the terminal.

## Installation

```bash
# With bun (recommended)
bun install -g serenity-ai-cli

# Or with npm
npm install -g serenity-ai-cli
```

## Quick Start

```bash
# Set your API key (get it from Settings > API Keys)
serenity-ai-cli auth set sk-serenity-your-key-here

# Verify connection
serenity-ai-cli auth test

# Use staging environment
serenity-ai-cli --env stg auth set sk-serenity-staging-key
serenity-ai-cli --env stg auth test
```

## Environment Support

The CLI supports both **production** and **staging** environments:

```bash
# Production (default)
serenity-ai-cli conversations list

# Staging
serenity-ai-cli --env stg conversations list

# Or use environment variable
export SERENITY_ENV=stg
serenity-ai-cli conversations list
```

## Resources

| Resource | Alias | Description |
|---|---|---|
| `auth` | | Manage API authentication |
| `conversations` | `conv` | Manage conversations |
| `messages` | `msg` | Manage conversation messages |
| `agents` | | Manage persistent agents |
| `agent-todos` | | Manage agent tasks/todos |
| `agent-secrets` | | Manage agent secrets (AES-256-GCM encrypted) |
| `teams` | | Manage agent teams |
| `workspace` | `ws` | Manage workspaces (ephemeral pods) |
| `skills` | | Manage skills |
| `memories` | `mem` | Manage user memories & knowledge graph |
| `models` | | List available LLM models |
| `presets` | | Manage conversation presets |
| `files` | | Manage uploaded files |
| `settings` | | Manage user settings |
| `api-keys` | | Manage API keys |
| `hierarchy` | | View agent hierarchy |
| `work-states` | | Manage work states (objective tracking) |

## Output Formats

```bash
# Table (default)
serenity-ai-cli agents list

# JSON (for scripting)
serenity-ai-cli agents list --json

# CSV
serenity-ai-cli agents list --format csv

# YAML
serenity-ai-cli agents list --format yaml
```

## Examples

```bash
# List all agents
serenity-ai-cli agents list

# Create a new agent
serenity-ai-cli agents create --name "My Agent" --role coder --model claude-sonnet-4-20250514

# Send a message to an agent
serenity-ai-cli agents send-message <agent-id> --type notification --title "Deploy done"

# Create a team and assign a task
serenity-ai-cli teams create --name "Feature Team" --description "Implement auth module"
serenity-ai-cli teams assign <team-id> --title "Add login endpoint" --description "..."

# Execute command in a workspace
serenity-ai-cli ws exec <workspace-id> --command "git status"

# Search conversations
serenity-ai-cli messages search --query "deployment bug"

# Manage memories
serenity-ai-cli memories list --category preference
serenity-ai-cli memories create --content "User prefers dark mode" --category preference
```

## Authentication

The CLI uses **API keys** (`sk-serenity-*`) for authentication. Tokens are stored per-environment in:
- `~/.config/tokens/serenity-ai-cli-prod.txt`
- `~/.config/tokens/serenity-ai-cli-stg.txt`

Tokens are stored with `chmod 600` (owner read/write only).

## License

MIT
