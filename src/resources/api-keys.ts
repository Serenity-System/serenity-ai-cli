import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const apiKeysResource = new Command("api-keys")
  .description("Manage API keys");

apiKeysResource
  .command("list")
  .description("List API keys")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/api-keys");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

apiKeysResource
  .command("create")
  .description("Create a new API key")
  .requiredOption("--name <name>", "Key name")
  .option("--scopes <scopes>", "Comma-separated scopes")
  .option("--expires <days>", "Expires in N days")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.scopes) body.scopes = opts.scopes.split(",");
      if (opts.expires) body.expires_in_days = parseInt(opts.expires);
      const data = await client.post("/api/api-keys", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

apiKeysResource
  .command("delete")
  .description("Revoke an API key")
  .argument("<id>", "Key ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/api-keys/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

apiKeysResource
  .command("regenerate")
  .description("Regenerate an API key")
  .argument("<id>", "Key ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.post(`/api/api-keys/${id}/regenerate`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
