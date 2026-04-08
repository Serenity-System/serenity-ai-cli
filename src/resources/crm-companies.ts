import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmCompaniesResource = new Command("crm-companies")
  .description("CRM — Companies");

crmCompaniesResource
  .command("list")
  .description("List companies")
  .option("--page <n>", "Page number", "1")
  .option("--per-page <n>", "Items per page", "20")
  .option("--search <q>", "Search query")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page, per_page: opts.perPage };
      if (opts.search) params.search = opts.search;
      const data = await client.get("/api/crm/companies", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("get")
  .description("Get company details")
  .argument("<id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/crm/companies/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("create")
  .description("Create a company")
  .requiredOption("--name <name>", "Company name")
  .option("--email <email>", "Email")
  .option("--phone <phone>", "Phone")
  .option("--website <url>", "Website")
  .option("--siren <siren>", "SIREN number")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.email) body.email = opts.email;
      if (opts.phone) body.phone = opts.phone;
      if (opts.website) body.website = opts.website;
      if (opts.siren) body.siren = opts.siren;
      const data = await client.post("/api/crm/companies", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("update")
  .description("Update a company")
  .argument("<id>", "Company ID")
  .option("--name <name>", "Company name")
  .option("--email <email>", "Email")
  .option("--phone <phone>", "Phone")
  .option("--website <url>", "Website")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.email) body.email = opts.email;
      if (opts.phone) body.phone = opts.phone;
      if (opts.website) body.website = opts.website;
      const data = await client.patch(`/api/crm/companies/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("delete")
  .description("Delete a company")
  .argument("<id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/crm/companies/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("invoices")
  .description("List company invoices")
  .argument("<id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/crm/companies/${id}/invoices`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("health")
  .description("Get company health score")
  .argument("<id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/crm/companies/${id}/health`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmCompaniesResource
  .command("health-refresh")
  .description("Refresh company health score")
  .argument("<id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.post(`/api/crm/companies/${id}/health/refresh`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
