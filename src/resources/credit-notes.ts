import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const creditNotesResource = new Command("credit-notes")
  .description("CRM — Credit Notes (avoirs)");

creditNotesResource
  .command("list")
  .description("List credit notes")
  .option("--page <n>", "Page number", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/credit-notes", { page: opts.page }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

creditNotesResource
  .command("get")
  .description("Get credit note details")
  .argument("<id>", "Credit note ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/credit-notes/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

creditNotesResource
  .command("create")
  .description("Create a credit note")
  .requiredOption("--invoice <id>", "Original invoice ID")
  .option("--reason <reason>", "Reason")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { invoice_id: opts.invoice };
      if (opts.reason) body.reason = opts.reason;
      output(await client.post("/api/crm/credit-notes", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

creditNotesResource
  .command("submit-iopole")
  .description("Submit credit note to IOPOLE")
  .argument("<id>", "Credit note ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/crm/credit-notes/${id}/submit-iopole`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
