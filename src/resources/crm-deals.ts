import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmDealsResource = new Command("crm-deals")
  .description("CRM — Deals / Opportunities");

crmDealsResource
  .command("list")
  .description("List deals")
  .option("--page <n>", "Page number", "1")
  .option("--stage <s>", "Filter by stage")
  .option("--company <id>", "Filter by company")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.stage) params.stage = opts.stage;
      if (opts.company) params.company_id = opts.company;
      const data = await client.get("/api/crm/deals", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmDealsResource
  .command("get")
  .description("Get deal details")
  .argument("<id>", "Deal ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/crm/deals/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmDealsResource
  .command("create")
  .description("Create a deal")
  .requiredOption("--title <title>", "Deal title")
  .requiredOption("--company <id>", "Company ID")
  .option("--amount <n>", "Deal amount")
  .option("--stage <s>", "Pipeline stage")
  .option("--contact <id>", "Contact ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { title: opts.title, company_id: opts.company };
      if (opts.amount) body.amount = parseFloat(opts.amount);
      if (opts.stage) body.stage = opts.stage;
      if (opts.contact) body.contact_id = opts.contact;
      const data = await client.post("/api/crm/deals", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmDealsResource
  .command("update")
  .description("Update a deal")
  .argument("<id>", "Deal ID")
  .option("--title <title>", "Deal title")
  .option("--amount <n>", "Amount")
  .option("--stage <s>", "Pipeline stage")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.title) body.title = opts.title;
      if (opts.amount) body.amount = parseFloat(opts.amount);
      if (opts.stage) body.stage = opts.stage;
      const data = await client.patch(`/api/crm/deals/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmDealsResource
  .command("won")
  .description("Mark deal as won")
  .argument("<id>", "Deal ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.post(`/api/crm/deals/${id}/won`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmDealsResource
  .command("lost")
  .description("Mark deal as lost")
  .argument("<id>", "Deal ID")
  .option("--reason <reason>", "Loss reason")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.reason) body.reason = opts.reason;
      const data = await client.post(`/api/crm/deals/${id}/lost`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmDealsResource
  .command("delete")
  .description("Delete a deal")
  .argument("<id>", "Deal ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/crm/deals/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
