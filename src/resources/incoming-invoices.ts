import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const incomingInvoicesResource = new Command("incoming-invoices")
  .description("Incoming invoices (fournisseurs)");

incomingInvoicesResource
  .command("list")
  .description("List incoming invoices")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      output(await client.get("/api/crm/incoming-invoices", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

incomingInvoicesResource
  .command("get")
  .description("Get incoming invoice details")
  .argument("<id>", "Invoice ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/incoming-invoices/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

incomingInvoicesResource
  .command("create")
  .description("Create an incoming invoice")
  .requiredOption("--supplier <name>", "Supplier name")
  .option("--amount <n>", "Amount")
  .option("--due-date <date>", "Due date")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { supplier: opts.supplier };
      if (opts.amount) body.amount = parseFloat(opts.amount);
      if (opts.dueDate) body.due_date = opts.dueDate;
      output(await client.post("/api/crm/incoming-invoices", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

incomingInvoicesResource
  .command("stats")
  .description("Get incoming invoice stats")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/incoming-invoices/stats"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

incomingInvoicesResource
  .command("transition")
  .description("Transition invoice status")
  .argument("<id>", "Invoice ID")
  .requiredOption("--to <status>", "Target status")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/crm/incoming-invoices/${id}/transition`, { to: opts.to }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
