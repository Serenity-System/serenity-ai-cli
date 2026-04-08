import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentSecretsResource = new Command("agent-secrets")
  .description("Manage agent secrets (encrypted at rest)");

agentSecretsResource
  .command("list")
  .description("List secrets for an agent (keys only)")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get(`/api/agents/${opts.agent}/secrets`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentSecretsResource
  .command("get")
  .description("Get a secret value")
  .argument("<key>", "Secret key")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (key, opts) => {
    try {
      const data = await client.get(`/api/agents/${opts.agent}/secrets/${key}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentSecretsResource
  .command("set")
  .description("Create or update a secret")
  .requiredOption("--agent <id>", "Agent ID")
  .requiredOption("--key <key>", "Secret key")
  .requiredOption("--value <value>", "Secret value")
  .option("--description <desc>", "Description")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {
        key: opts.key,
        value: opts.value,
      };
      if (opts.description) body.description = opts.description;
      const data = await client.post(`/api/agents/${opts.agent}/secrets`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentSecretsResource
  .command("delete")
  .description("Delete a secret")
  .argument("<key>", "Secret key")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (key, opts) => {
    try {
      await client.delete(`/api/agents/${opts.agent}/secrets/${key}`);
      output({ deleted: true, key }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
