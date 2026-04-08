import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmContactsResource = new Command("crm-contacts")
  .description("CRM — Contacts");

crmContactsResource
  .command("list")
  .description("List contacts")
  .option("--page <n>", "Page number", "1")
  .option("--per-page <n>", "Items per page", "20")
  .option("--company <id>", "Filter by company ID")
  .option("--search <q>", "Search query")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page, per_page: opts.perPage };
      if (opts.company) params.company_id = opts.company;
      if (opts.search) params.search = opts.search;
      const data = await client.get("/api/crm/contacts", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmContactsResource
  .command("get")
  .description("Get contact details")
  .argument("<id>", "Contact ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/crm/contacts/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmContactsResource
  .command("create")
  .description("Create a contact")
  .requiredOption("--first-name <name>", "First name")
  .requiredOption("--last-name <name>", "Last name")
  .option("--email <email>", "Email")
  .option("--phone <phone>", "Phone")
  .option("--company <id>", "Company ID")
  .option("--role <role>", "Role/title")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { first_name: opts.firstName, last_name: opts.lastName };
      if (opts.email) body.email = opts.email;
      if (opts.phone) body.phone = opts.phone;
      if (opts.company) body.company_id = opts.company;
      if (opts.role) body.role = opts.role;
      const data = await client.post("/api/crm/contacts", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmContactsResource
  .command("update")
  .description("Update a contact")
  .argument("<id>", "Contact ID")
  .option("--first-name <name>", "First name")
  .option("--last-name <name>", "Last name")
  .option("--email <email>", "Email")
  .option("--phone <phone>", "Phone")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.firstName) body.first_name = opts.firstName;
      if (opts.lastName) body.last_name = opts.lastName;
      if (opts.email) body.email = opts.email;
      if (opts.phone) body.phone = opts.phone;
      const data = await client.patch(`/api/crm/contacts/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmContactsResource
  .command("delete")
  .description("Delete a contact")
  .argument("<id>", "Contact ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/crm/contacts/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
