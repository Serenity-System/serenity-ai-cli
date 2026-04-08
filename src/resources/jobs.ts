import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const jobsResource = new Command("jobs")
  .description("Background jobs");

jobsResource
  .command("list")
  .description("List jobs")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      output(await client.get("/api/jobs", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

jobsResource
  .command("get")
  .description("Get job details")
  .argument("<id>", "Job ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/jobs/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
