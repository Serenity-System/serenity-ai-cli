import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const repositoriesResource = new Command("repositories")
  .description("Git repositories");

repositoriesResource
  .command("list")
  .description("List repositories")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/repos"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

repositoriesResource
  .command("get")
  .description("Get repository details")
  .argument("<id>", "Repository ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/repos/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

repositoriesResource
  .command("create")
  .description("Add a repository")
  .requiredOption("--url <url>", "Repository URL")
  .option("--name <name>", "Display name")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { url: opts.url };
      if (opts.name) body.name = opts.name;
      output(await client.post("/api/repos", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

repositoriesResource
  .command("update")
  .description("Update a repository")
  .argument("<id>", "Repository ID")
  .option("--name <name>", "Display name")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      output(await client.patch(`/api/repos/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

repositoriesResource
  .command("delete")
  .description("Remove a repository")
  .argument("<id>", "Repository ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/repos/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

repositoriesResource
  .command("sync")
  .description("Sync a repository")
  .argument("<id>", "Repository ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/repos/${id}/sync`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

repositoriesResource
  .command("search")
  .description("Search repositories")
  .requiredOption("--query <q>", "Search query")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/repos/search", { q: opts.query }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
