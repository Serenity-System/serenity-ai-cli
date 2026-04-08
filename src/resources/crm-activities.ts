import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmActivitiesResource = new Command("crm-activities")
  .description("CRM — Activities & Tasks");

crmActivitiesResource
  .command("list")
  .description("List activities")
  .option("--page <n>", "Page number", "1")
  .option("--company <id>", "Filter by company")
  .option("--type <t>", "Filter by type (call/email/meeting/note)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.company) params.company_id = opts.company;
      if (opts.type) params.type = opts.type;
      output(await client.get("/api/crm/activities", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmActivitiesResource
  .command("get")
  .description("Get activity details")
  .argument("<id>", "Activity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/activities/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmActivitiesResource
  .command("create")
  .description("Create an activity")
  .requiredOption("--type <type>", "Type (call/email/meeting/note)")
  .requiredOption("--subject <subject>", "Subject")
  .option("--company <id>", "Company ID")
  .option("--contact <id>", "Contact ID")
  .option("--description <desc>", "Description")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { type: opts.type, subject: opts.subject };
      if (opts.company) body.company_id = opts.company;
      if (opts.contact) body.contact_id = opts.contact;
      if (opts.description) body.description = opts.description;
      output(await client.post("/api/crm/activities", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmActivitiesResource
  .command("update")
  .description("Update an activity")
  .argument("<id>", "Activity ID")
  .option("--subject <subject>", "Subject")
  .option("--description <desc>", "Description")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.subject) body.subject = opts.subject;
      if (opts.description) body.description = opts.description;
      output(await client.patch(`/api/crm/activities/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmActivitiesResource
  .command("delete")
  .description("Delete an activity")
  .argument("<id>", "Activity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/crm/activities/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });
