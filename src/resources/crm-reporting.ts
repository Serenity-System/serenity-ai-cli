import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmReportingResource = new Command("crm-reporting")
  .description("CRM — Reporting, MRR, Pipeline & Search");

// --- Reporting ---
crmReportingResource
  .command("overview")
  .description("Get reporting overview")
  .option("--period <p>", "Period (7d/30d/90d/1y)", "30d")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/reporting/overview", { period: opts.period }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("mrr-evolution")
  .description("MRR evolution over time")
  .option("--period <p>", "Period", "90d")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/reporting/mrr-evolution", { period: opts.period }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("pipeline-funnel")
  .description("Pipeline funnel analysis")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/reporting/pipeline-funnel"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("churn-analysis")
  .description("Churn analysis")
  .option("--period <p>", "Period", "90d")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/reporting/churn-analysis", { period: opts.period }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("health-distribution")
  .description("Health score distribution")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/reporting/health-distribution"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("revenue-by-service")
  .description("Revenue breakdown by service")
  .option("--period <p>", "Period", "30d")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/reporting/revenue-by-service", { period: opts.period }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- MRR ---
crmReportingResource
  .command("mrr-current")
  .description("Current MRR")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/mrr/current"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("mrr-history")
  .description("MRR history")
  .option("--months <n>", "Number of months", "12")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/mrr/history", { months: opts.months }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("mrr-breakdown")
  .description("MRR breakdown by product/company")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/mrr/breakdown"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Pipeline ---
crmReportingResource
  .command("pipeline-summary")
  .description("Pipeline summary")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/pipeline/summary"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("pipeline-stages")
  .description("Pipeline stages detail")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/crm/pipeline/stages"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Search & Export ---
crmReportingResource
  .command("search")
  .description("Search across CRM")
  .requiredOption("--query <q>", "Search query")
  .option("--type <t>", "Entity type (company/contact/deal)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { q: opts.query };
      if (opts.type) params.type = opts.type;
      output(await client.get("/api/crm/search", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmReportingResource
  .command("export")
  .description("Export CRM data")
  .argument("<entity>", "Entity type (companies/contacts/deals/invoices)")
  .option("--format <f>", "Format (csv/json)", "csv")
  .option("--json", "JSON output")
  .action(async (entity, opts) => {
    try { output(await client.get(`/api/crm/export/${entity}`, { format: opts.format }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
