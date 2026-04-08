import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentMemoriesResource = new Command("agent-memories")
  .description("Per-agent isolated memories");

agentMemoriesResource
  .command("list")
  .description("List agent memories")
  .argument("<agent-id>", "Agent ID")
  .option("--category <c>", "Filter by category")
  .option("--search <q>", "Search query")
  .option("--json", "JSON output")
  .action(async (agentId, opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.category) params.category = opts.category;
      if (opts.search) params.search = opts.search;
      output(await client.get(`/api/agents/${agentId}/memories`, params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentMemoriesResource
  .command("add")
  .description("Add a memory to an agent")
  .argument("<agent-id>", "Agent ID")
  .requiredOption("--content <text>", "Memory content")
  .option("--category <c>", "Category", "other")
  .option("--json", "JSON output")
  .action(async (agentId, opts) => {
    try {
      output(await client.post(`/api/agents/${agentId}/memories`, { content: opts.content, category: opts.category }), opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentMemoriesResource
  .command("delete")
  .description("Delete an agent memory")
  .argument("<agent-id>", "Agent ID")
  .argument("<memory-id>", "Memory ID")
  .option("--json", "JSON output")
  .action(async (agentId, memoryId, opts) => {
    try { await client.delete(`/api/agents/${agentId}/memories/${memoryId}`); output({ deleted: true }, opts); }
    catch (err) { handleError(err, opts.json); }
  });
