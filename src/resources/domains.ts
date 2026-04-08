import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const domainsResource = new Command("domains")
  .description("Domain management (Gandi)");

domainsResource
  .command("list")
  .description("List domains")
  .option("--page <n>", "Page number", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/domains", { page: opts.page }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

domainsResource
  .command("get")
  .description("Get domain details")
  .argument("<domain>", "Domain name")
  .option("--json", "JSON output")
  .action(async (domain, opts) => {
    try { output(await client.get(`/api/domains/${domain}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

domainsResource
  .command("check")
  .description("Check domain availability")
  .argument("<domain>", "Domain name")
  .option("--json", "JSON output")
  .action(async (domain, opts) => {
    try { output(await client.get(`/api/domains/check/${domain}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

domainsResource
  .command("create")
  .description("Register a domain")
  .requiredOption("--domain <domain>", "Domain name")
  .option("--company <id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { domain: opts.domain };
      if (opts.company) body.company_id = opts.company;
      output(await client.post("/api/domains", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });
