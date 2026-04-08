import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const subscriptionsResource = new Command("subscriptions")
  .description("Stripe subscriptions & billing portal");

subscriptionsResource.command("list").description("List subscriptions").option("--json").action(async (opts) => {
  try { output(await client.get("/api/v1/subscriptions"), opts); } catch (e) { handleError(e, opts.json); }
});
subscriptionsResource.command("get").description("Get subscription").argument("<stripe-sub-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/v1/subscriptions/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
subscriptionsResource.command("add-addon").description("Add addon to subscription").argument("<stripe-sub-id>").requiredOption("--price-id <priceId>").option("--quantity <n>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/v1/subscriptions/${id}/addons`, { price_id: opts.priceId, quantity: opts.quantity ? parseInt(opts.quantity) : 1 }), opts); } catch (e) { handleError(e, opts.json); }
});
subscriptionsResource.command("remove-addon").description("Remove addon").argument("<stripe-sub-id>").argument("<item-id>").option("--json").action(async (subId, itemId, opts) => {
  try { await client.delete(`/api/v1/subscriptions/${subId}/addons/${itemId}`); output({ deleted: true }, opts); } catch (e) { handleError(e, opts.json); }
});
subscriptionsResource.command("change-plan").description("Change subscription plan").argument("<stripe-sub-id>").requiredOption("--price-id <priceId>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/v1/subscriptions/${id}/change-plan`, { price_id: opts.priceId }), opts); } catch (e) { handleError(e, opts.json); }
});
subscriptionsResource.command("billing-portal").description("Create billing portal session").option("--return-url <url>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/billing-portal/sessions", { return_url: opts.returnUrl }), opts); } catch (e) { handleError(e, opts.json); }
});
