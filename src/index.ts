#!/usr/bin/env bun
import { Command } from "commander";
import { globalFlags, ENVIRONMENTS } from "./lib/config.js";
import { authCommand } from "./commands/auth.js";
import { conversationsResource } from "./resources/conversations.js";
import { messagesResource } from "./resources/messages.js";
import { agentsResource } from "./resources/agents.js";
import { agentTodosResource } from "./resources/agent-todos.js";
import { agentSecretsResource } from "./resources/agent-secrets.js";
import { teamsResource } from "./resources/teams.js";
import { workspaceResource } from "./resources/workspace.js";
import { skillsResource } from "./resources/skills.js";
import { memoriesResource } from "./resources/memories.js";
import { modelsResource } from "./resources/models.js";
import { presetsResource } from "./resources/presets.js";
import { filesResource } from "./resources/files.js";
import { settingsResource } from "./resources/settings.js";
import { apiKeysResource } from "./resources/api-keys.js";
import { hierarchyResource } from "./resources/hierarchy.js";
import { workStatesResource } from "./resources/work-states.js";

const program = new Command();

program
  .name("serenity-ai-cli")
  .description("CLI for the Serenity AI platform — manage conversations, agents, teams, workspaces and more")
  .version("0.1.0")
  .option("--env <env>", `Environment: ${Object.keys(ENVIRONMENTS).join(", ")}`, "")
  .option("--json", "Output as JSON", false)
  .option("--format <fmt>", "Output format: text, json, csv, yaml", "text")
  .option("--verbose", "Enable debug logging", false)
  .option("--no-color", "Disable colored output")
  .option("--no-header", "Omit table/csv headers (for piping)")
  .hook("preAction", (_thisCmd, actionCmd) => {
    const root = actionCmd.optsWithGlobals();
    globalFlags.env = root.env ?? "";
    globalFlags.json = root.json ?? false;
    globalFlags.format = root.format ?? "text";
    globalFlags.verbose = root.verbose ?? false;
    globalFlags.noColor = root.color === false;
    globalFlags.noHeader = root.header === false;
  });

// Built-in commands
program.addCommand(authCommand);

// Core AI resources
program.addCommand(conversationsResource);
program.addCommand(messagesResource);
program.addCommand(agentsResource);
program.addCommand(agentTodosResource);
program.addCommand(agentSecretsResource);
program.addCommand(teamsResource);
program.addCommand(workspaceResource);
program.addCommand(skillsResource);
program.addCommand(memoriesResource);
program.addCommand(modelsResource);
program.addCommand(presetsResource);
program.addCommand(filesResource);
program.addCommand(settingsResource);
program.addCommand(apiKeysResource);
program.addCommand(hierarchyResource);
program.addCommand(workStatesResource);

program.parse();
