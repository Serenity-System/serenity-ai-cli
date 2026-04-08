import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const quotesResource = new Command("quotes")
  .description("Quotes / Devis");

quotesResource
  .command("list")
  .description("List quotes")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status (draft/sent/accepted/rejected/expired/cancelled)")
  .option("--company <id>", "Filter by company")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      if (opts.company) params.company_id = opts.company;
      output(await client.get("/api/quotes", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

quotesResource
  .command("get")
  .description("Get quote details")
  .argument("<id>", "Quote ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/quotes/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

quotesResource
  .command("create")
  .description("Create a quote")
  .requiredOption("--company <id>", "Company ID")
  .option("--valid-until <date>", "Valid until (YYYY-MM-DD)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { company_id: opts.company };
      if (opts.validUntil) body.valid_until = opts.validUntil;
      output(await client.post("/api/quotes", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

quotesResource
  .command("update")
  .description("Update a quote")
  .argument("<id>", "Quote ID")
  .option("--valid-until <date>", "Valid until")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.validUntil) body.valid_until = opts.validUntil;
      output(await client.patch(`/api/quotes/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

quotesResource
  .command("delete")
  .description("Delete a quote")
  .argument("<id>", "Quote ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/quotes/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

for (const action of ["send", "accept", "reject", "cancel", "expire", "convert"]) {
  quotesResource
    .command(action)
    .description(`${action.charAt(0).toUpperCase() + action.slice(1)} a quote`)
    .argument("<id>", "Quote ID")
    .option("--json", "JSON output")
    .action(async (id, opts) => {
      try { output(await client.post(`/api/quotes/${id}/${action}`), opts); }
      catch (err) { handleError(err, opts.json); }
    });
}

quotesResource
  .command("pdf")
  .description("Download quote PDF")
  .argument("<id>", "Quote ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/quotes/${id}/pdf`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
