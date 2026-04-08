import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const analyticsResource = new Command("analytics")
  .description("Analytics — GA4, Search Console, PageSpeed");

// --- GA4 ---
analyticsResource
  .command("ga4")
  .description("Google Analytics 4 data")
  .option("--property <id>", "GA4 property ID")
  .option("--date-range <r>", "Date range (7d/30d/90d)", "30d")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { date_range: opts.dateRange };
      if (opts.property) params.property_id = opts.property;
      output(await client.get("/api/analytics/ga4", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Search Console ---
analyticsResource
  .command("search-console")
  .description("Google Search Console data")
  .option("--site <url>", "Site URL")
  .option("--date-range <r>", "Date range", "30d")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { date_range: opts.dateRange };
      if (opts.site) params.site_url = opts.site;
      output(await client.get("/api/analytics/search-console", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- PageSpeed ---
analyticsResource
  .command("pagespeed")
  .description("PageSpeed Insights audit")
  .requiredOption("--url <url>", "URL to audit")
  .option("--strategy <s>", "Strategy (mobile/desktop)", "mobile")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      output(await client.get("/api/analytics/pagespeed", { url: opts.url, strategy: opts.strategy }), opts);
    } catch (err) { handleError(err, opts.json); }
  });

analyticsResource
  .command("json-ld")
  .description("JSON-LD structured data check")
  .requiredOption("--url <url>", "URL to check")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/analytics/json-ld", { url: opts.url }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
