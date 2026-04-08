import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const workStatesResource = new Command("work-states")
  .description("Manage work states (objective tracking)");

workStatesResource
  .command("list")
  .description("List active work states")
  .option("--status <s>", "Filter status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.status) params.status = opts.status;
      const data = await client.get("/api/work-states", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

workStatesResource
  .command("get")
  .description("Get work state details")
  .argument("<id>", "Work state ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/work-states/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
