import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const memoriesResource = new Command("memories")
  .alias("mem")
  .description("Manage user memories");

memoriesResource
  .command("list")
  .description("List memories")
  .option("--category <cat>", "Filter by category")
  .option("--search <q>", "Search text")
  .option("--limit <n>", "Max results", "50")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { limit: opts.limit };
      if (opts.category) params.category = opts.category;
      if (opts.search) params.search = opts.search;
      const data = await client.get("/api/memories", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

memoriesResource
  .command("get")
  .description("Get a memory")
  .argument("<id>", "Memory ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/memories/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

memoriesResource
  .command("create")
  .description("Create a memory")
  .requiredOption("--content <text>", "Memory content")
  .option("--category <cat>", "Category", "other")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.post("/api/memories", {
        content: opts.content,
        category: opts.category,
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

memoriesResource
  .command("update")
  .description("Update a memory")
  .argument("<id>", "Memory ID")
  .option("--content <text>", "New content")
  .option("--category <cat>", "New category")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.content) body.content = opts.content;
      if (opts.category) body.category = opts.category;
      const data = await client.put(`/api/memories/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

memoriesResource
  .command("delete")
  .description("Delete a memory")
  .argument("<id>", "Memory ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/memories/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

memoriesResource
  .command("categories")
  .description("List memory categories")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/memories/categories");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

memoriesResource
  .command("graph")
  .description("Get knowledge graph")
  .option("--type <t>", "nodes or edges", "nodes")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get(`/api/memories/graph/${opts.type}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
