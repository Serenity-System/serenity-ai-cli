import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentMonitoringResource = new Command("agent-monitoring")
  .description("Agent monitoring dashboard");

agentMonitoringResource.command("status").description("Get agents monitoring status").option("--json").action(async (opts) => {
  try { output(await client.get("/api/agents/monitoring"), opts); } catch (e) { handleError(e, opts.json); }
});
