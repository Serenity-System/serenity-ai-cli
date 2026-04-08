import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const complianceResource = new Command("compliance")
  .description("Compliance — RGPD, E-reporting, Accounting, Archive, Abuse");

// --- RGPD Erasure ---
complianceResource
  .command("erasure-request")
  .description("Request data erasure (RGPD Art. 17)")
  .requiredOption("--email <email>", "User email")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/erasure", { email: opts.email }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("erasure-list")
  .description("List erasure requests")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/erasure"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- RGPD Export ---
complianceResource
  .command("export-request")
  .description("Request data export (RGPD Art. 20)")
  .requiredOption("--email <email>", "User email")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/rgpd-export", { email: opts.email }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("export-list")
  .description("List export requests")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/rgpd-export"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- E-reporting ---
complianceResource
  .command("ereporting")
  .description("E-reporting B2C & international")
  .option("--period <p>", "Period (YYYY-MM)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.period) params.period = opts.period;
      output(await client.get("/api/ereporting", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("ereporting-submit")
  .description("Submit e-reporting")
  .option("--period <p>", "Period (YYYY-MM)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.period) body.period = opts.period;
      output(await client.post("/api/ereporting", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Accounting ---
complianceResource
  .command("accounting")
  .description("Accounting engine & FEC")
  .option("--period <p>", "Period")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.period) params.period = opts.period;
      output(await client.get("/api/accounting", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("fec-export")
  .description("Export FEC file")
  .requiredOption("--year <y>", "Fiscal year")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/accounting/fec", { year: opts.year }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Archive ---
complianceResource
  .command("archive")
  .description("Legal archive (GCS + IOPOLE)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/archive"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("archive-create")
  .description("Create an archive entry")
  .requiredOption("--document-id <id>", "Document ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/archive", { document_id: opts.documentId }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Abuse ---
complianceResource
  .command("abuse-rules")
  .description("List abuse rules")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/abuse/rules"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("abuse-rule-create")
  .description("Create an abuse rule")
  .requiredOption("--name <name>", "Rule name")
  .requiredOption("--pattern <p>", "Detection pattern")
  .option("--action <a>", "Action (warn/suspend/block)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name, pattern: opts.pattern };
      if (opts.action) body.action = opts.action;
      output(await client.post("/api/abuse/rules", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("abuse-reports")
  .description("List abuse reports")
  .option("--status <s>", "Filter (pending/reviewed)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.status) params.status = opts.status;
      output(await client.get("/api/abuse/reports", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("abuse-report-review")
  .description("Review an abuse report")
  .argument("<id>", "Report ID")
  .requiredOption("--decision <d>", "Decision (dismiss/warn/suspend/block)")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/abuse/reports/${id}/review`, { decision: opts.decision }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("abuse-suspensions")
  .description("List suspensions")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/abuse/suspensions"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("abuse-suspension-lift")
  .description("Lift a suspension")
  .argument("<id>", "Suspension ID")
  .option("--reason <reason>", "Reason")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.reason) body.reason = opts.reason;
      output(await client.post(`/api/abuse/suspensions/${id}/lift`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

complianceResource
  .command("abuse-check")
  .description("Check content for abuse")
  .requiredOption("--content <text>", "Content to check")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/abuse/check", { content: opts.content }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
