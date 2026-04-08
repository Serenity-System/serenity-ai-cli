import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmInvoicesResource = new Command("crm-invoices")
  .description("CRM — Invoices");

crmInvoicesResource
  .command("list")
  .description("List invoices")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status (draft/sent/paid/overdue/cancelled)")
  .option("--company <id>", "Filter by company")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      if (opts.company) params.company_id = opts.company;
      output(await client.get("/api/crm/invoices", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("get")
  .description("Get invoice details")
  .argument("<id>", "Invoice ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/invoices/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("create")
  .description("Create an invoice")
  .requiredOption("--company <id>", "Company ID")
  .option("--due-date <date>", "Due date (YYYY-MM-DD)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { company_id: opts.company };
      if (opts.dueDate) body.due_date = opts.dueDate;
      output(await client.post("/api/crm/invoices", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("update")
  .description("Update an invoice")
  .argument("<id>", "Invoice ID")
  .option("--due-date <date>", "Due date")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.dueDate) body.due_date = opts.dueDate;
      output(await client.patch(`/api/crm/invoices/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("send")
  .description("Send invoice to client")
  .argument("<id>", "Invoice ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/crm/invoices/${id}/send`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("pdf")
  .description("Download invoice PDF")
  .argument("<id>", "Invoice ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/invoices/${id}/pdf`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("submit-iopole")
  .description("Submit invoice to IOPOLE (e-invoicing)")
  .argument("<id>", "Invoice ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/crm/invoices/${id}/submit-iopole`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("cancel")
  .description("Cancel an invoice")
  .argument("<id>", "Invoice ID")
  .option("--reason <reason>", "Cancellation reason")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.reason) body.reason = opts.reason;
      output(await client.post(`/api/crm/invoices/${id}/cancel`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmInvoicesResource
  .command("payments")
  .description("List invoice payments")
  .argument("<id>", "Invoice ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/invoices/${id}/payments`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
