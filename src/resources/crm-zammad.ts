import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmZammadResource = new Command("crm-zammad")
  .description("CRM Zammad helpdesk integration");

crmZammadResource.command("status").description("Zammad integration status").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/zammad/status"), opts); } catch (e) { handleError(e, opts.json); }
});
crmZammadResource.command("sync").description("Sync with Zammad").option("--json").action(async (opts) => {
  try { output(await client.post("/api/crm/zammad/sync"), opts); } catch (e) { handleError(e, opts.json); }
});
crmZammadResource.command("import-tickets").description("Import tickets from Zammad").option("--since <date>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/crm/zammad/import-tickets", { since: opts.since }), opts); } catch (e) { handleError(e, opts.json); }
});
crmZammadResource.command("link-contact").description("Link CRM contact to Zammad user").requiredOption("--contact-id <id>").requiredOption("--zammad-user-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/crm/zammad/link-contact", { contact_id: opts.contactId, zammad_user_id: opts.zammadUserId }), opts); } catch (e) { handleError(e, opts.json); }
});
