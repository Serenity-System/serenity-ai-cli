import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const filesResource = new Command("files")
  .description("Manage uploaded files");

filesResource
  .command("list")
  .description("List files")
  .option("--limit <n>", "Max results", "20")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/files", { limit: opts.limit });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

filesResource
  .command("get")
  .description("Get file details")
  .argument("<id>", "File ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/files/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

filesResource
  .command("delete")
  .description("Delete a file")
  .argument("<id>", "File ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/files/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

filesResource
  .command("limits")
  .description("Get upload limits")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/files/limits");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

filesResource
  .command("usage")
  .description("Get storage usage")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/files/usage");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
