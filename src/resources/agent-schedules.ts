import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentSchedulesResource = new Command("agent-schedules")
  .description("Agent scheduled tasks (cron)");

agentSchedulesResource.command("create").description("Create schedule").argument("<agent-id>").requiredOption("--cron <expr>", "Cron expression").requiredOption("--prompt <prompt>", "Prompt to run").option("--name <name>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/agents/${id}/schedules`, { cron: opts.cron, prompt: opts.prompt, name: opts.name }), opts); } catch (e) { handleError(e, opts.json); }
});
agentSchedulesResource.command("list").description("List schedules").argument("<agent-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/agents/${id}/schedules`), opts); } catch (e) { handleError(e, opts.json); }
});
agentSchedulesResource.command("update").description("Update schedule").argument("<agent-id>").argument("<schedule-id>").option("--cron <expr>").option("--prompt <prompt>").option("--enabled <bool>").option("--json").action(async (agentId, scheduleId, opts) => {
  try { const body: Record<string, unknown> = {}; if (opts.cron) body.cron = opts.cron; if (opts.prompt) body.prompt = opts.prompt; if (opts.enabled !== undefined) body.enabled = opts.enabled === "true"; output(await client.patch(`/api/agents/${agentId}/schedules/${scheduleId}`, body), opts); } catch (e) { handleError(e, opts.json); }
});
agentSchedulesResource.command("delete").description("Delete schedule").argument("<agent-id>").argument("<schedule-id>").option("--json").action(async (agentId, scheduleId, opts) => {
  try { await client.delete(`/api/agents/${agentId}/schedules/${scheduleId}`); output({ deleted: true }, opts); } catch (e) { handleError(e, opts.json); }
});
