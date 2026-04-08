import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const ereportingResource = new Command("ereporting")
  .description("E-reporting (electronic invoicing compliance)");

ereportingResource.command("submit").description("Submit e-report").requiredOption("--invoice-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/ereporting/submit", { invoice_id: opts.invoiceId }), opts); } catch (e) { handleError(e, opts.json); }
});
ereportingResource.command("list").description("List submissions").option("--status <status>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/ereporting/submissions", { status: opts.status }), opts); } catch (e) { handleError(e, opts.json); }
});
ereportingResource.command("get").description("Get submission").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/ereporting/submissions/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
ereportingResource.command("sync").description("Sync submission status").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/ereporting/submissions/${id}/sync`), opts); } catch (e) { handleError(e, opts.json); }
});
