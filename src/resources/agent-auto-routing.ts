import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentAutoRoutingResource = new Command("agent-auto-routing")
  .description("Agent auto-routing: evaluate, proposals, metrics");

agentAutoRoutingResource.command("evaluate").description("Evaluate auto-routing for agent").argument("<agent-id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/agents/${id}/auto-routing/evaluate`), opts); } catch (e) { handleError(e, opts.json); }
});
agentAutoRoutingResource.command("proposals").description("List routing proposals").argument("<agent-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/agents/${id}/auto-routing/proposals`), opts); } catch (e) { handleError(e, opts.json); }
});
agentAutoRoutingResource.command("proposal-get").description("Get routing proposal").argument("<agent-id>").argument("<proposal-id>").option("--json").action(async (agentId, proposalId, opts) => {
  try { output(await client.get(`/api/agents/${agentId}/auto-routing/proposals/${proposalId}`), opts); } catch (e) { handleError(e, opts.json); }
});
agentAutoRoutingResource.command("proposal-update").description("Update routing proposal").argument("<agent-id>").argument("<proposal-id>").option("--status <status>", "accepted|rejected").option("--json").action(async (agentId, proposalId, opts) => {
  try { output(await client.patch(`/api/agents/${agentId}/auto-routing/proposals/${proposalId}`, { status: opts.status }), opts); } catch (e) { handleError(e, opts.json); }
});
agentAutoRoutingResource.command("metrics").description("Get routing metrics").argument("<agent-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/agents/${id}/auto-routing/metrics`), opts); } catch (e) { handleError(e, opts.json); }
});
agentAutoRoutingResource.command("record-outcome").description("Record routing outcome").argument("<agent-id>").requiredOption("--proposal-id <id>").requiredOption("--outcome <outcome>", "success|failure").option("--json").action(async (agentId, opts) => {
  try { output(await client.post(`/api/agents/${agentId}/auto-routing/record-outcome`, { proposal_id: opts.proposalId, outcome: opts.outcome }), opts); } catch (e) { handleError(e, opts.json); }
});
