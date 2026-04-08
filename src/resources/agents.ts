import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentsResource = new Command("agents")
  .description("Manage persistent agents");

agentsResource
  .command("list")
  .description("List all agents")
  .option("--status <s>", "Filter by status (idle/working/stopped/error)")
  .option("--role <r>", "Filter by role")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.status) params.status = opts.status;
      if (opts.role) params.role = opts.role;
      const data = await client.get("/api/agents", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("get")
  .description("Get agent details")
  .argument("<id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/agents/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("create")
  .description("Create a new agent")
  .requiredOption("--name <name>", "Agent name")
  .option("--role <role>", "Agent role", "general")
  .option("--system-prompt <prompt>", "System prompt")
  .option("--model <model>", "LLM model")
  .option("--parent <id>", "Parent agent ID")
  .option("--permanent", "Auto-respawn on startup")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name, role: opts.role };
      if (opts.systemPrompt) body.system_prompt = opts.systemPrompt;
      if (opts.model) body.config = { model: opts.model };
      if (opts.parent) body.parent_id = opts.parent;
      if (opts.permanent) body.is_permanent = true;
      const data = await client.post("/api/agents", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("update")
  .description("Update an agent")
  .argument("<id>", "Agent ID")
  .option("--name <name>", "New name")
  .option("--role <role>", "New role")
  .option("--system-prompt <prompt>", "New system prompt")
  .option("--active <bool>", "Enable/disable")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.role) body.role = opts.role;
      if (opts.systemPrompt) body.system_prompt = opts.systemPrompt;
      if (opts.active !== undefined) body.is_active = opts.active === "true";
      const data = await client.put(`/api/agents/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("delete")
  .description("Delete an agent")
  .argument("<id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/agents/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Sub-resources: inbox, messages, delegate, escalate ---

agentsResource
  .command("inbox")
  .description("Read agent inbox")
  .argument("<id>", "Agent ID")
  .option("--count <n>", "Max messages", "20")
  .option("--type <t>", "Filter type (delegation/escalation/notification/request/response)")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const params: Record<string, string> = { count: opts.count };
      if (opts.type) params.type_filter = opts.type;
      const data = await client.get(`/api/agents/${id}/inbox`, params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("send-message")
  .description("Send a message to an agent")
  .argument("<id>", "Agent ID")
  .requiredOption("--type <type>", "Message type (delegation/escalation/notification/request/response)")
  .requiredOption("--title <title>", "Message title")
  .option("--description <desc>", "Message body")
  .option("--priority <n>", "Priority (0=normal, 1=high, 2=critical)", "0")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {
        type: opts.type,
        title: opts.title,
        priority: parseInt(opts.priority),
      };
      if (opts.description) body.description = opts.description;
      const data = await client.post(`/api/agents/${id}/messages`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("delegate")
  .description("Delegate a task to a child agent")
  .argument("<id>", "Agent ID")
  .requiredOption("--title <title>", "Task title")
  .option("--description <desc>", "Task description")
  .option("--priority <n>", "Priority", "0")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {
        title: opts.title,
        priority: parseInt(opts.priority),
      };
      if (opts.description) body.description = opts.description;
      const data = await client.post(`/api/agents/${id}/delegate`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("escalate")
  .description("Escalate to parent agent")
  .argument("<id>", "Agent ID")
  .requiredOption("--title <title>", "Escalation title")
  .option("--description <desc>", "Description")
  .option("--severity <s>", "Severity (info/blocked/error)", "blocked")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {
        title: opts.title,
        severity: opts.severity,
      };
      if (opts.description) body.description = opts.description;
      const data = await client.post(`/api/agents/${id}/escalate`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentsResource
  .command("stats")
  .description("Get agent messaging stats")
  .argument("<id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/agents/${id}/messages/stats`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
