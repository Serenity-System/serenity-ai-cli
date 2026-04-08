import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmSearchResource = new Command("crm-search")
  .description("CRM global search");

crmSearchResource.command("search").description("Search across all CRM entities").requiredOption("--query <q>").option("--type <type>", "companies|contacts|deals").option("--json").action(async (opts) => {
  try { output(await client.get("/api/crm/search", { query: opts.query, type: opts.type }), opts); } catch (e) { handleError(e, opts.json); }
});
