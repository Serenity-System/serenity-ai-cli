import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentTodosResource = new Command("agent-todos")
  .description("Manage agent tasks/todos");

agentTodosResource
  .command("list")
  .description("List todos for an agent")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--status <s>", "Filter status (pending/in_progress/completed/failed)")
  .option("--limit <n>", "Max results", "20")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { limit: opts.limit };
      if (opts.status) params.status = opts.status;
      const data = await client.get(`/api/agents/${opts.agent}/todos`, params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentTodosResource
  .command("create")
  .description("Create a todo for an agent")
  .requiredOption("--agent <id>", "Agent ID")
  .requiredOption("--title <title>", "Task title")
  .option("--description <desc>", "Task description")
  .option("--priority <n>", "Priority (0/1/2)", "0")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {
        title: opts.title,
        priority: parseInt(opts.priority),
      };
      if (opts.description) body.description = opts.description;
      const data = await client.post(`/api/agents/${opts.agent}/todos`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentTodosResource
  .command("update")
  .description("Update a todo")
  .argument("<todo-id>", "Todo ID")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--status <s>", "New status")
  .option("--title <title>", "New title")
  .option("--json", "JSON output")
  .action(async (todoId, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.status) body.status = opts.status;
      if (opts.title) body.title = opts.title;
      const data = await client.put(`/api/agents/${opts.agent}/todos/${todoId}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentTodosResource
  .command("delete")
  .description("Delete a todo")
  .argument("<todo-id>", "Todo ID")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (todoId, opts) => {
    try {
      await client.delete(`/api/agents/${opts.agent}/todos/${todoId}`);
      output({ deleted: true, id: todoId }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
