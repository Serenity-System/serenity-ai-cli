import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const accountingResource = new Command("accounting")
  .description("Accounting: accounts, journal entries, FEC export");

accountingResource.command("initialize").description("Initialize accounting for entity").option("--entity-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/accounting/initialize", { entity_id: opts.entityId }), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("accounts").description("List chart of accounts").option("--json").action(async (opts) => {
  try { output(await client.get("/api/accounting/accounts"), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("journals").description("List journals").option("--json").action(async (opts) => {
  try { output(await client.get("/api/accounting/journals"), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("entries").description("List journal entries").option("--from <date>").option("--to <date>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/accounting/entries", { from: opts.from, to: opts.to }), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("entry-create").description("Create journal entry").requiredOption("--journal <journal>").requiredOption("--lines <json>", "JSON array of lines").option("--date <date>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/accounting/entries", { journal: opts.journal, lines: JSON.parse(opts.lines), date: opts.date }), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("entry-get").description("Get journal entry").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/accounting/entries/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("entry-validate").description("Validate journal entry").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/accounting/entries/${id}/validate`), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("from-invoice").description("Create entry from invoice").requiredOption("--invoice-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/accounting/entries/from-invoice", { invoice_id: opts.invoiceId }), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("from-payment").description("Create entry from payment").requiredOption("--payment-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/accounting/entries/from-payment", { payment_id: opts.paymentId }), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("from-credit-note").description("Create entry from credit note").requiredOption("--credit-note-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/accounting/entries/from-credit-note", { credit_note_id: opts.creditNoteId }), opts); } catch (e) { handleError(e, opts.json); }
});
accountingResource.command("fec-export").description("Export FEC file").option("--year <year>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/accounting/fec/export", { year: opts.year ? parseInt(opts.year) : undefined }), opts); } catch (e) { handleError(e, opts.json); }
});
