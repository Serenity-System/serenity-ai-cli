import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const presetsResource = new Command("presets")
  .description("Manage conversation presets");

presetsResource
  .command("list")
  .description("List presets")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/presets");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

presetsResource
  .command("create")
  .description("Create a preset")
  .requiredOption("--name <name>", "Preset name")
  .option("--model <model>", "Model")
  .option("--system-prompt <prompt>", "System prompt")
  .option("--temperature <t>", "Temperature")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.model) body.model = opts.model;
      if (opts.systemPrompt) body.system_prompt = opts.systemPrompt;
      if (opts.temperature) body.temperature = parseFloat(opts.temperature);
      const data = await client.post("/api/presets", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

presetsResource
  .command("update")
  .description("Update a preset")
  .argument("<id>", "Preset ID")
  .option("--name <name>", "New name")
  .option("--model <model>", "Model")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.model) body.model = opts.model;
      const data = await client.put(`/api/presets/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

presetsResource
  .command("delete")
  .description("Delete a preset")
  .argument("<id>", "Preset ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/presets/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
