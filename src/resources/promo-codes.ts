import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const promoCodesResource = new Command("promo-codes")
  .description("Promo codes");

promoCodesResource
  .command("list")
  .description("List promo codes")
  .option("--page <n>", "Page number", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/promo-codes", { page: opts.page }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

promoCodesResource
  .command("get")
  .description("Get promo code details")
  .argument("<id>", "Promo code ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/promo-codes/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

promoCodesResource
  .command("create")
  .description("Create a promo code")
  .requiredOption("--code <code>", "Code string")
  .requiredOption("--discount-type <type>", "Type (percentage/fixed)")
  .requiredOption("--discount-value <n>", "Discount value")
  .option("--max-uses <n>", "Max uses")
  .option("--expires-at <date>", "Expiry date (YYYY-MM-DD)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {
        code: opts.code, discount_type: opts.discountType,
        discount_value: parseFloat(opts.discountValue),
      };
      if (opts.maxUses) body.max_uses = parseInt(opts.maxUses);
      if (opts.expiresAt) body.expires_at = opts.expiresAt;
      output(await client.post("/api/promo-codes", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

promoCodesResource
  .command("update")
  .description("Update a promo code")
  .argument("<id>", "Promo code ID")
  .option("--max-uses <n>", "Max uses")
  .option("--active <bool>", "Active (true/false)")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.maxUses) body.max_uses = parseInt(opts.maxUses);
      if (opts.active !== undefined) body.is_active = opts.active === "true";
      output(await client.patch(`/api/promo-codes/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

promoCodesResource
  .command("delete")
  .description("Delete a promo code")
  .argument("<id>", "Promo code ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/promo-codes/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

promoCodesResource
  .command("usages")
  .description("List promo code usages")
  .argument("<id>", "Promo code ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/promo-codes/${id}/usages`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

promoCodesResource
  .command("validate")
  .description("Validate a promo code")
  .requiredOption("--code <code>", "Promo code to validate")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/promo-codes/validate", { code: opts.code }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
