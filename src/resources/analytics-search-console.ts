import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const analyticsSearchConsoleResource = new Command("analytics-search-console")
  .description("Google Search Console data");

analyticsSearchConsoleResource.command("performance").description("Search performance data").option("--from <date>").option("--to <date>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/analytics/search-console/performance", { from: opts.from, to: opts.to }), opts); } catch (e) { handleError(e, opts.json); }
});
analyticsSearchConsoleResource.command("pages").description("Top pages data").option("--from <date>").option("--to <date>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/analytics/search-console/pages", { from: opts.from, to: opts.to }), opts); } catch (e) { handleError(e, opts.json); }
});
