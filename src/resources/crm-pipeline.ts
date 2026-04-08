import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmPipelineResource = new Command("crm-pipeline")
  .description("CRM sales pipeline");

crmPipelineResource.command("summary").description("Pipeline summary").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/pipeline/summary"), opts); } catch (e) { handleError(e, opts.json); }
});
crmPipelineResource.command("stages").description("Pipeline stages detail").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/pipeline/stages"), opts); } catch (e) { handleError(e, opts.json); }
});
