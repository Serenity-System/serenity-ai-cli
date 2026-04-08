import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const emailTemplatesResource = new Command("email-templates")
  .description("Brevo email templates management");

emailTemplatesResource.command("seed").description("Seed default templates").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/email-templates/seed"), opts); } catch (e) { handleError(e, opts.json); }
});
emailTemplatesResource.command("create").description("Create email template").requiredOption("--slug <slug>").requiredOption("--subject <subject>").requiredOption("--html <html>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/email-templates", { slug: opts.slug, subject: opts.subject, html_content: opts.html }), opts); } catch (e) { handleError(e, opts.json); }
});
emailTemplatesResource.command("list").description("List templates").option("--json").action(async (opts) => {
  try { output(await client.get("/api/v1/email-templates"), opts); } catch (e) { handleError(e, opts.json); }
});
emailTemplatesResource.command("get").description("Get template").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/v1/email-templates/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
emailTemplatesResource.command("update").description("Update template").argument("<id>").option("--subject <subject>").option("--html <html>").option("--json").action(async (id, opts) => {
  try { const body: Record<string, unknown> = {}; if (opts.subject) body.subject = opts.subject; if (opts.html) body.html_content = opts.html; output(await client.patch(`/api/v1/email-templates/${id}`, body), opts); } catch (e) { handleError(e, opts.json); }
});
emailTemplatesResource.command("delete").description("Delete template").argument("<id>").option("--json").action(async (id, opts) => {
  try { await client.delete(`/api/v1/email-templates/${id}`); output({ deleted: true, id }, opts); } catch (e) { handleError(e, opts.json); }
});
emailTemplatesResource.command("render").description("Render template with variables").argument("<slug>").option("--vars <json>", "JSON variables").option("--json").action(async (slug, opts) => {
  try { output(await client.post(`/api/v1/email-templates/${slug}/render`, opts.vars ? JSON.parse(opts.vars) : {}), opts); } catch (e) { handleError(e, opts.json); }
});
