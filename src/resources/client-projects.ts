import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const clientProjectsResource = new Command("client-projects")
  .description("Client projects management");

clientProjectsResource.command("list").description("List client projects").option("--json").action(async (opts) => {
  try { output(await client.get("/api/v1/client-projects"), opts); } catch (e) { handleError(e, opts.json); }
});
clientProjectsResource.command("create").description("Create project").requiredOption("--name <name>").option("--description <desc>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/client-projects", { name: opts.name, description: opts.description }), opts); } catch (e) { handleError(e, opts.json); }
});
clientProjectsResource.command("get").description("Get project").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/v1/client-projects/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
clientProjectsResource.command("update").description("Update project").argument("<id>").option("--name <name>").option("--description <desc>").option("--json").action(async (id, opts) => {
  try { const body: Record<string, unknown> = {}; if (opts.name) body.name = opts.name; if (opts.description) body.description = opts.description; output(await client.patch(`/api/v1/client-projects/${id}`, body), opts); } catch (e) { handleError(e, opts.json); }
});
clientProjectsResource.command("delete").description("Delete project").argument("<id>").option("--json").action(async (id, opts) => {
  try { await client.delete(`/api/v1/client-projects/${id}`); output({ deleted: true, id }, opts); } catch (e) { handleError(e, opts.json); }
});
clientProjectsResource.command("milestones").description("List milestones").argument("<project-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/v1/client-projects/${id}/milestones`), opts); } catch (e) { handleError(e, opts.json); }
});
clientProjectsResource.command("milestone-create").description("Create milestone").argument("<project-id>").requiredOption("--title <title>").option("--due-date <date>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/v1/client-projects/${id}/milestones`, { title: opts.title, due_date: opts.dueDate }), opts); } catch (e) { handleError(e, opts.json); }
});
