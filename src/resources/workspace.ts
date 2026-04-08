import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const workspaceResource = new Command("workspace")
  .alias("ws")
  .description("Manage workspaces (ephemeral pods)");

workspaceResource
  .command("list")
  .description("List active workspaces")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/workspace/pods");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("create")
  .description("Create a new workspace")
  .requiredOption("--name <name>", "Workspace name")
  .option("--repo <url>", "Git repo URL to clone")
  .option("--branch <b>", "Branch to checkout", "main")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.repo) body.git_repo_url = opts.repo;
      if (opts.branch) body.git_branch = opts.branch;
      const data = await client.post("/api/workspace", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("exec")
  .description("Execute a command in a workspace")
  .argument("<workspace-id>", "Workspace ID")
  .requiredOption("--command <cmd>", "Command to execute")
  .option("--timeout <n>", "Timeout in seconds", "30")
  .option("--json", "JSON output")
  .action(async (wsId, opts) => {
    try {
      const data = await client.post(`/api/workspace/${wsId}/exec`, {
        command: opts.command,
        timeout: parseInt(opts.timeout),
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("read")
  .description("Read a file from a workspace")
  .argument("<workspace-id>", "Workspace ID")
  .requiredOption("--path <path>", "File path")
  .option("--json", "JSON output")
  .action(async (wsId, opts) => {
    try {
      const data = await client.get(`/api/workspace/${wsId}/read`, { path: opts.path });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("write")
  .description("Write a file to a workspace")
  .argument("<workspace-id>", "Workspace ID")
  .requiredOption("--path <path>", "File path")
  .requiredOption("--content <content>", "File content")
  .option("--json", "JSON output")
  .action(async (wsId, opts) => {
    try {
      const data = await client.post(`/api/workspace/${wsId}/write`, {
        path: opts.path,
        content: opts.content,
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("destroy")
  .description("Destroy a workspace")
  .argument("<workspace-id>", "Workspace ID")
  .option("--json", "JSON output")
  .action(async (wsId, opts) => {
    try {
      await client.delete(`/api/workspace/${wsId}`);
      output({ destroyed: true, id: wsId }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("git-status")
  .description("Get git status in a workspace")
  .argument("<workspace-id>", "Workspace ID")
  .option("--json", "JSON output")
  .action(async (wsId, opts) => {
    try {
      const data = await client.get(`/api/workspace/${wsId}/git/status`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workspaceResource
  .command("git-push")
  .description("Push commits from a workspace")
  .argument("<workspace-id>", "Workspace ID")
  .option("--branch <b>", "Branch to push")
  .option("--json", "JSON output")
  .action(async (wsId, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.branch) body.branch = opts.branch;
      const data = await client.post(`/api/workspace/${wsId}/git/push`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
