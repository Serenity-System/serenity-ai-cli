import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmMrrResource = new Command("crm-mrr")
  .description("CRM Monthly Recurring Revenue analytics");

crmMrrResource.command("current").description("Get current MRR").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/mrr/current"), opts); } catch (e) { handleError(e, opts.json); }
});
crmMrrResource.command("history").description("MRR history over time").option("--from <date>").option("--to <date>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/mrr/history", { from: opts.from, to: opts.to }), opts); } catch (e) { handleError(e, opts.json); }
});
crmMrrResource.command("breakdown").description("MRR breakdown by plan/segment").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/mrr/breakdown"), opts); } catch (e) { handleError(e, opts.json); }
});
