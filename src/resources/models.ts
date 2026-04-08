import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const modelsResource = new Command("models")
  .description("List available LLM models");

modelsResource
  .command("list")
  .description("List all models")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/models");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

modelsResource
  .command("get")
  .description("Get model details")
  .argument("<id>", "Model ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/models/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
