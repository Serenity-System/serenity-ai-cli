import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmHealthResource = new Command("crm-health")
  .description("CRM company health scores");

crmHealthResource.command("get").description("Get company health score").argument("<company-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/crm/companies/${id}/health`), opts); } catch (e) { handleError(e, opts.json); }
});
crmHealthResource.command("refresh").description("Refresh company health score").argument("<company-id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/crm/companies/${id}/health/refresh`), opts); } catch (e) { handleError(e, opts.json); }
});
