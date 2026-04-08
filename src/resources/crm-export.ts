import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmExportResource = new Command("crm-export")
  .description("CRM data export");

crmExportResource.command("export").description("Export CRM entity data").argument("<entity>", "companies|contacts|deals|subscriptions|invoices").option("--format <fmt>", "csv|json|xlsx").option("--json").action(async (entity, opts) => {
  try { output(await client.get(`/api/crm/export/${entity}`, { format: opts.format }), opts); } catch (e) { handleError(e, opts.json); }
});
