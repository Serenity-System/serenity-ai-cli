import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentWebhooksResource = new Command("agent-webhooks")
  .description("Agent webhook endpoints");

agentWebhooksResource.command("create").description("Create webhook").argument("<agent-id>").requiredOption("--url <url>", "Webhook URL").option("--events <events>", "Comma-separated events").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/agents/${id}/webhooks`, { url: opts.url, events: opts.events?.split(",") }), opts); } catch (e) { handleError(e, opts.json); }
});
agentWebhooksResource.command("list").description("List webhooks").argument("<agent-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/agents/${id}/webhooks`), opts); } catch (e) { handleError(e, opts.json); }
});
agentWebhooksResource.command("delete").description("Delete webhook").argument("<agent-id>").argument("<webhook-id>").option("--json").action(async (agentId, webhookId, opts) => {
  try { await client.delete(`/api/agents/${agentId}/webhooks/${webhookId}`); output({ deleted: true }, opts); } catch (e) { handleError(e, opts.json); }
});
agentWebhooksResource.command("events").description("List webhook events").argument("<agent-id>").argument("<webhook-id>").option("--json").action(async (agentId, webhookId, opts) => {
  try { output(await client.get(`/api/agents/${agentId}/webhooks/${webhookId}/events`), opts); } catch (e) { handleError(e, opts.json); }
});
agentWebhooksResource.command("rotate-secret").description("Rotate webhook secret").argument("<agent-id>").argument("<webhook-id>").option("--json").action(async (agentId, webhookId, opts) => {
  try { output(await client.post(`/api/agents/${agentId}/webhooks/${webhookId}/rotate-secret`), opts); } catch (e) { handleError(e, opts.json); }
});
