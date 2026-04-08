import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const ordersResource = new Command("orders")
  .description("Orders & Checkout");

ordersResource
  .command("list")
  .description("List orders")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      output(await client.get("/api/v1/orders", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

ordersResource
  .command("get")
  .description("Get order details")
  .argument("<id>", "Order ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/orders/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

ordersResource
  .command("create")
  .description("Create an order")
  .requiredOption("--company <id>", "Company ID")
  .option("--items <json>", "Items JSON array")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { company_id: opts.company };
      if (opts.items) body.items = JSON.parse(opts.items);
      output(await client.post("/api/v1/orders", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

ordersResource
  .command("update")
  .description("Update an order")
  .argument("<id>", "Order ID")
  .option("--status <s>", "Status")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.status) body.status = opts.status;
      output(await client.patch(`/api/v1/orders/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

ordersResource
  .command("cancel")
  .description("Cancel an order")
  .argument("<id>", "Order ID")
  .option("--reason <reason>", "Cancellation reason")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.reason) body.reason = opts.reason;
      output(await client.post(`/api/v1/orders/${id}/cancel`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

ordersResource
  .command("refund")
  .description("Refund an order")
  .argument("<id>", "Order ID")
  .option("--amount <n>", "Refund amount (partial)")
  .option("--reason <reason>", "Refund reason")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.amount) body.amount = parseFloat(opts.amount);
      if (opts.reason) body.reason = opts.reason;
      output(await client.post(`/api/v1/orders/${id}/refund`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

ordersResource
  .command("validate-cart")
  .description("Validate a cart before checkout")
  .option("--items <json>", "Items JSON array")
  .option("--promo-code <code>", "Promo code")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.items) body.items = JSON.parse(opts.items);
      if (opts.promoCode) body.promo_code = opts.promoCode;
      output(await client.post("/api/v1/orders/validate-cart", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Checkout ---
ordersResource
  .command("checkout")
  .description("Create a Stripe checkout session")
  .requiredOption("--order <id>", "Order ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/checkout", { order_id: opts.order }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
