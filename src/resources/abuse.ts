import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const abuseResource = new Command("abuse")
  .description("Manage abuse reports, rules and suspensions");

abuseResource.command("rules-list").description("List abuse rules").option("--json").action(async (opts) => {
  try { output(await client.get("/api/abuse/rules"), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("rules-create").description("Create abuse rule").requiredOption("--name <name>", "Rule name").requiredOption("--pattern <pattern>", "Detection pattern").option("--action <action>", "Action: warn|suspend|block").option("--json").action(async (opts) => {
  try { output(await client.post("/api/abuse/rules", { name: opts.name, pattern: opts.pattern, action: opts.action }), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("rules-get").description("Get abuse rule").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/abuse/rules/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("rules-update").description("Update abuse rule").argument("<id>").option("--name <name>").option("--pattern <pattern>").option("--action <action>").option("--json").action(async (id, opts) => {
  try { const body: Record<string, unknown> = {}; if (opts.name) body.name = opts.name; if (opts.pattern) body.pattern = opts.pattern; if (opts.action) body.action = opts.action; output(await client.patch(`/api/abuse/rules/${id}`, body), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("rules-delete").description("Delete abuse rule").argument("<id>").option("--json").action(async (id, opts) => {
  try { await client.delete(`/api/abuse/rules/${id}`); output({ deleted: true, id }, opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("reports-list").description("List abuse reports").option("--status <status>", "Filter: pending|reviewed").option("--json").action(async (opts) => {
  try { output(await client.get("/api/abuse/reports", { status: opts.status }), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("reports-create").description("Create abuse report").requiredOption("--type <type>", "Type: phishing|malware|spam|dmca").requiredOption("--url <url>", "Reported URL").option("--description <desc>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/abuse/reports", { type: opts.type, url: opts.url, description: opts.description }), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("reports-get").description("Get abuse report").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/abuse/reports/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("reports-review").description("Review abuse report").argument("<id>").requiredOption("--verdict <verdict>", "Verdict: valid|invalid|escalate").option("--notes <notes>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/abuse/reports/${id}/review`, { verdict: opts.verdict, notes: opts.notes }), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("suspensions-list").description("List suspensions").option("--json").action(async (opts) => {
  try { output(await client.get("/api/abuse/suspensions"), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("suspensions-get").description("Get suspension").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/abuse/suspensions/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("suspensions-lift").description("Lift suspension").argument("<id>").option("--reason <reason>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/abuse/suspensions/${id}/lift`, { reason: opts.reason }), opts); } catch (e) { handleError(e, opts.json); }
});
abuseResource.command("check").description("Check URL for abuse").requiredOption("--url <url>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/abuse/check", { url: opts.url }), opts); } catch (e) { handleError(e, opts.json); }
});
