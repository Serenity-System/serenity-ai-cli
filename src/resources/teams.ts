import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const teamsResource = new Command("teams")
  .description("Manage agent teams");

teamsResource
  .command("list")
  .description("List teams")
  .option("--status <s>", "Filter: active, stopped, all", "active")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/teams", { status: opts.status });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

teamsResource
  .command("get")
  .description("Get team status")
  .argument("<id>", "Team ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/teams/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

teamsResource
  .command("create")
  .description("Create a new team")
  .requiredOption("--name <name>", "Team name")
  .requiredOption("--description <desc>", "What the team should accomplish")
  .option("--repo <url>", "Git repository URL")
  .option("--branch <b>", "Base branch", "main")
  .option("--mode <m>", "Orchestration: pipeline or lead_driven", "pipeline")
  .option("--max-parallel <n>", "Max parallel tasks", "3")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {
        name: opts.name,
        description: opts.description,
        orchestration_mode: opts.mode,
        max_parallel_tasks: parseInt(opts.maxParallel),
      };
      if (opts.repo) body.git_repo_url = opts.repo;
      if (opts.branch) body.git_base_branch = opts.branch;
      const data = await client.post("/api/teams", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

teamsResource
  .command("assign")
  .description("Assign a task to the team")
  .argument("<team-id>", "Team ID")
  .requiredOption("--title <title>", "Task title")
  .requiredOption("--description <desc>", "Task description")
  .option("--role <r>", "Agent role (coder/tester/reviewer)")
  .option("--priority <n>", "Priority (0/1/2)", "0")
  .option("--json", "JSON output")
  .action(async (teamId, opts) => {
    try {
      const body: Record<string, unknown> = {
        title: opts.title,
        description: opts.description,
        priority: parseInt(opts.priority),
      };
      if (opts.role) body.role = opts.role;
      const data = await client.post(`/api/teams/${teamId}/tasks`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

teamsResource
  .command("agents")
  .description("List agents in a team")
  .argument("<id>", "Team ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/teams/${id}/agents`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

teamsResource
  .command("reports")
  .description("Get pending reports from a team")
  .argument("<id>", "Team ID")
  .option("--max <n>", "Max reports", "20")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/teams/${id}/reports`, { max_count: opts.max });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

teamsResource
  .command("stop")
  .description("Stop a team")
  .argument("<id>", "Team ID")
  .option("--reason <reason>", "Reason for stopping")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.reason) body.reason = opts.reason;
      const data = await client.delete(`/api/teams/${id}`);
      output(data ?? { stopped: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
