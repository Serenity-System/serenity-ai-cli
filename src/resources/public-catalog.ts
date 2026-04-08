import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const publicCatalogResource = new Command("public-catalog")
  .description("Public product catalog (no auth required)");

publicCatalogResource.command("products").description("List public catalog products").option("--category <cat>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/v1/public/catalog", { category: opts.category }, { noAuth: true }), opts); } catch (e) { handleError(e, opts.json); }
});
publicCatalogResource.command("product-get").description("Get product by slug").argument("<slug>").option("--json").action(async (slug, opts) => {
  try { output(await client.get(`/api/v1/public/catalog/${slug}`, undefined, { noAuth: true }), opts); } catch (e) { handleError(e, opts.json); }
});
publicCatalogResource.command("categories").description("List product categories").option("--json").action(async (opts) => {
  try { output(await client.get("/api/v1/public/categories", undefined, { noAuth: true }), opts); } catch (e) { handleError(e, opts.json); }
});
