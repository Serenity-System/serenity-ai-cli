import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const conversationsResource = new Command("conversations")
  .alias("conv")
  .description("Manage conversations");

conversationsResource
  .command("list")
  .description("List conversations")
  .option("--limit <n>", "Max results", "20")
  .option("--offset <n>", "Offset", "0")
  .option("--search <q>", "Search by title")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/conversations", {
        limit: opts.limit,
        offset: opts.offset,
        ...(opts.search && { search: opts.search }),
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

conversationsResource
  .command("get")
  .description("Get a conversation")
  .argument("<id>", "Conversation ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/conversations/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

conversationsResource
  .command("create")
  .description("Create a conversation")
  .option("--title <title>", "Conversation title")
  .option("--model <model>", "Model to use")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.title) body.title = opts.title;
      if (opts.model) body.model = opts.model;
      const data = await client.post("/api/conversations", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

conversationsResource
  .command("update")
  .description("Update a conversation")
  .argument("<id>", "Conversation ID")
  .option("--title <title>", "New title")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.title) body.title = opts.title;
      const data = await client.put(`/api/conversations/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

conversationsResource
  .command("delete")
  .description("Delete a conversation")
  .argument("<id>", "Conversation ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/conversations/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });
