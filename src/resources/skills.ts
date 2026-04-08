import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const skillsResource = new Command("skills")
  .description("Manage skills");

skillsResource
  .command("list")
  .description("List installed skills")
  .option("--enabled", "Only enabled skills")
  .option("--lazy", "Only lazy skills")
  .option("--default", "Only default skills")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.enabled) params.enabled_only = "true";
      if (opts.lazy) params.is_lazy = "true";
      if (opts.default) params.is_default = "true";
      const data = await client.get("/api/skills", params);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

skillsResource
  .command("get")
  .description("Get skill details")
  .argument("<id>", "Skill ID or slug")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/skills/${id}`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

skillsResource
  .command("create")
  .description("Create a new skill")
  .requiredOption("--name <name>", "Skill name")
  .requiredOption("--content <content>", "SKILL.md content")
  .option("--slug <slug>", "URL-safe identifier")
  .option("--description <desc>", "Short description")
  .option("--lazy", "Load on demand")
  .option("--trigger <desc>", "When to load this skill")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {
        name: opts.name,
        content: opts.content,
      };
      if (opts.slug) body.slug = opts.slug;
      if (opts.description) body.description = opts.description;
      if (opts.lazy) body.is_lazy = true;
      if (opts.trigger) body.trigger_description = opts.trigger;
      const data = await client.post("/api/skills", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

skillsResource
  .command("update")
  .description("Update a skill")
  .argument("<id>", "Skill ID")
  .option("--name <name>", "New name")
  .option("--content <content>", "New SKILL.md content")
  .option("--enabled <bool>", "Enable/disable")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.content) body.content = opts.content;
      if (opts.enabled !== undefined) body.is_enabled = opts.enabled === "true";
      const data = await client.put(`/api/skills/${id}`, body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

skillsResource
  .command("delete")
  .description("Delete a skill")
  .argument("<id>", "Skill ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      await client.delete(`/api/skills/${id}`);
      output({ deleted: true, id }, opts);
    } catch (err) { handleError(err, opts.json); }
  });

skillsResource
  .command("search")
  .description("Search skills catalogue")
  .requiredOption("--query <q>", "Search query")
  .option("--limit <n>", "Max results", "8")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/skills/search", {
        query: opts.query,
        limit: opts.limit,
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

skillsResource
  .command("load")
  .description("Load full SKILL.md content")
  .argument("<id>", "Skill ID or slug")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const data = await client.get(`/api/skills/${id}/load`);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
