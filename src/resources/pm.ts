import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const pmResource = new Command("pm")
  .description("Project management — projects, epics, stories, tasks, wiki");

// --- Projects ---
pmResource
  .command("projects")
  .description("List projects")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/pm/projects"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("project-create")
  .description("Create a project")
  .requiredOption("--name <name>", "Project name")
  .option("--description <desc>", "Description")
  .option("--github-repo <repo>", "GitHub repo (owner/repo)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.description) body.description = opts.description;
      if (opts.githubRepo) body.github_repo = opts.githubRepo;
      output(await client.post("/api/pm/projects", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("project-get")
  .description("Get project details")
  .argument("<id>", "Project ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/pm/projects/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("board")
  .description("Get project kanban board")
  .argument("<id>", "Project ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/pm/projects/${id}/board`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Epics ---
pmResource
  .command("epics")
  .description("List project epics")
  .argument("<project-id>", "Project ID")
  .option("--json", "JSON output")
  .action(async (projectId, opts) => {
    try { output(await client.get(`/api/pm/projects/${projectId}/epics`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("epic-get")
  .description("Get epic details")
  .argument("<id>", "Epic ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/pm/epics/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Stories ---
pmResource
  .command("stories")
  .description("List project stories")
  .argument("<project-id>", "Project ID")
  .option("--status <s>", "Filter by status")
  .option("--epic <id>", "Filter by epic")
  .option("--json", "JSON output")
  .action(async (projectId, opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.status) params.status = opts.status;
      if (opts.epic) params.epic_id = opts.epic;
      output(await client.get(`/api/pm/projects/${projectId}/stories`, params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("story-get")
  .description("Get story details")
  .argument("<id>", "Story ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/pm/stories/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("story-create")
  .description("Create a story")
  .argument("<project-id>", "Project ID")
  .requiredOption("--title <title>", "Story title")
  .option("--description <desc>", "Description")
  .option("--epic <id>", "Epic ID")
  .option("--priority <p>", "Priority (low/normal/high/critical)")
  .option("--json", "JSON output")
  .action(async (projectId, opts) => {
    try {
      const body: Record<string, unknown> = { title: opts.title };
      if (opts.description) body.description = opts.description;
      if (opts.epic) body.epic_id = opts.epic;
      if (opts.priority) body.priority = opts.priority;
      output(await client.post(`/api/pm/projects/${projectId}/stories`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("story-update")
  .description("Update a story")
  .argument("<id>", "Story ID")
  .option("--title <title>", "Title")
  .option("--status <s>", "Status")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.title) body.title = opts.title;
      if (opts.status) body.status = opts.status;
      output(await client.patch(`/api/pm/stories/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Tasks ---
pmResource
  .command("tasks")
  .description("List story tasks")
  .argument("<story-id>", "Story ID")
  .option("--json", "JSON output")
  .action(async (storyId, opts) => {
    try { output(await client.get(`/api/pm/stories/${storyId}/tasks`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Wiki ---
pmResource
  .command("wiki")
  .description("List project wiki pages")
  .argument("<project-id>", "Project ID")
  .option("--json", "JSON output")
  .action(async (projectId, opts) => {
    try { output(await client.get(`/api/pm/projects/${projectId}/wiki`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

pmResource
  .command("wiki-get")
  .description("Get wiki page")
  .argument("<id>", "Wiki page ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/pm/wiki/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
