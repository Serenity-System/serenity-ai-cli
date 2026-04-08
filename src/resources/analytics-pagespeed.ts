import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const analyticsPagespeedResource = new Command("analytics-pagespeed")
  .description("PageSpeed insights and JSON-LD generators");

analyticsPagespeedResource.command("analyze").description("Run PageSpeed analysis").option("--url <url>").option("--strategy <s>", "mobile|desktop").option("--json").action(async (opts) => {
  try { output(await client.get("/api/analytics/pagespeed", { url: opts.url, strategy: opts.strategy }), opts); } catch (e) { handleError(e, opts.json); }
});
analyticsPagespeedResource.command("jsonld-organization").description("Generate Organization JSON-LD").option("--name <name>").option("--url <url>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/analytics/jsonld/organization", { name: opts.name, url: opts.url }), opts); } catch (e) { handleError(e, opts.json); }
});
analyticsPagespeedResource.command("jsonld-product").description("Generate Product JSON-LD").option("--name <name>").option("--price <price>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/analytics/jsonld/product", { name: opts.name, price: opts.price }), opts); } catch (e) { handleError(e, opts.json); }
});
analyticsPagespeedResource.command("jsonld-faq").description("Generate FAQ JSON-LD").option("--items <json>", "JSON array of {q,a}").option("--json").action(async (opts) => {
  try { output(await client.post("/api/analytics/jsonld/faq", { items: opts.items ? JSON.parse(opts.items) : [] }), opts); } catch (e) { handleError(e, opts.json); }
});
analyticsPagespeedResource.command("jsonld-breadcrumb").description("Generate Breadcrumb JSON-LD").option("--items <json>", "JSON array of {name,url}").option("--json").action(async (opts) => {
  try { output(await client.post("/api/analytics/jsonld/breadcrumb", { items: opts.items ? JSON.parse(opts.items) : [] }), opts); } catch (e) { handleError(e, opts.json); }
});
