import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const hierarchyResource = new Command("hierarchy")
  .description("View agent hierarchy");

hierarchyResource
  .command("snapshot")
  .description("Get current hierarchy snapshot")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/agents/hierarchy");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
