import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const clientPanelResource = new Command("client-panel")
  .description("Client panel — services, invoices, tickets, projects");

clientPanelResource
  .command("services")
  .description("List client services")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/client/panel/services"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("domains")
  .description("List client domains")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/client/panel/domains"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("invoices")
  .description("List client invoices")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/client/panel/invoices"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("quotes")
  .description("List client quotes")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/client/panel/quotes"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("quote-accept")
  .description("Accept a quote")
  .requiredOption("--quote <id>", "Quote ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/client/panel/quotes/accept", { quote_id: opts.quote }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("projects")
  .description("List client projects")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/client/panel/projects"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("project-get")
  .description("Get project details")
  .argument("<id>", "Project ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/client/panel/projects/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("tickets")
  .description("List support tickets")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/client/panel/tickets"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("ticket-get")
  .description("Get ticket details")
  .argument("<id>", "Ticket ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/client/panel/tickets/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("ticket-create")
  .description("Create a support ticket")
  .requiredOption("--subject <subject>", "Subject")
  .requiredOption("--body <body>", "Body")
  .option("--priority <p>", "Priority (low/normal/high)", "normal")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      output(await client.post("/api/v1/client/panel/tickets", {
        subject: opts.subject, body: opts.body, priority: opts.priority,
      }), opts);
    } catch (err) { handleError(err, opts.json); }
  });

clientPanelResource
  .command("ticket-reply")
  .description("Reply to a support ticket")
  .argument("<id>", "Ticket ID")
  .requiredOption("--body <body>", "Reply body")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/v1/client/panel/tickets/${id}/reply`, { body: opts.body }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
