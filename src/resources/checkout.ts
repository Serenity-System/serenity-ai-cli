import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const checkoutResource = new Command("checkout")
  .description("Checkout sessions and order refunds");

checkoutResource.command("create-session").description("Create checkout session").requiredOption("--items <json>", "JSON array of items").option("--success-url <url>").option("--cancel-url <url>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/checkout/create-session", { items: JSON.parse(opts.items), success_url: opts.successUrl, cancel_url: opts.cancelUrl }), opts); } catch (e) { handleError(e, opts.json); }
});
checkoutResource.command("session-get").description("Get checkout session").argument("<session-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/v1/checkout/session/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
checkoutResource.command("refund").description("Refund an order").argument("<order-id>").option("--amount <amount>", "Partial refund amount").option("--reason <reason>").option("--json").action(async (id, opts) => {
  try { const body: Record<string, unknown> = {}; if (opts.amount) body.amount = parseFloat(opts.amount); if (opts.reason) body.reason = opts.reason; output(await client.post(`/api/v1/orders/${id}/refund`, body), opts); } catch (e) { handleError(e, opts.json); }
});
