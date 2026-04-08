import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmSubscriptionsResource = new Command("crm-subscriptions")
  .description("CRM — Subscriptions");

crmSubscriptionsResource
  .command("list")
  .description("List subscriptions")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status")
  .option("--company <id>", "Filter by company")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      if (opts.company) params.company_id = opts.company;
      const data = await client.get("/api/crm/subscriptions", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmSubscriptionsResource
  .command("get")
  .description("Get subscription details")
  .argument("<id>", "Subscription ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/subscriptions/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmSubscriptionsResource
  .command("create")
  .description("Create a subscription")
  .requiredOption("--company <id>", "Company ID")
  .requiredOption("--product <id>", "Product ID")
  .option("--pricing <id>", "Pricing ID")
  .option("--quantity <n>", "Quantity", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { company_id: opts.company, product_id: opts.product, quantity: parseInt(opts.quantity) };
      if (opts.pricing) body.pricing_id = opts.pricing;
      output(await client.post("/api/crm/subscriptions", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmSubscriptionsResource
  .command("update")
  .description("Update a subscription")
  .argument("<id>", "Subscription ID")
  .option("--status <s>", "New status")
  .option("--quantity <n>", "Quantity")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.status) body.status = opts.status;
      if (opts.quantity) body.quantity = parseInt(opts.quantity);
      output(await client.patch(`/api/crm/subscriptions/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmSubscriptionsResource
  .command("delete")
  .description("Delete a subscription")
  .argument("<id>", "Subscription ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/crm/subscriptions/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });
