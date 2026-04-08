import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const archiveResource = new Command("archive")
  .description("Document archiving (electronic archiving)");

archiveResource.command("upload").description("Archive a document").requiredOption("--file <path>").option("--type <type>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/archive/documents", { file: opts.file, type: opts.type }), opts); } catch (e) { handleError(e, opts.json); }
});
archiveResource.command("list").description("List archived documents").option("--type <type>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/archive/documents", { type: opts.type }), opts); } catch (e) { handleError(e, opts.json); }
});
archiveResource.command("get").description("Get archived document").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/archive/documents/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
archiveResource.command("retry").description("Retry failed archival").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/archive/documents/${id}/retry`), opts); } catch (e) { handleError(e, opts.json); }
});
archiveResource.command("webhook-confirm").description("Confirm archive webhook").option("--json").action(async (opts) => {
  try { output(await client.post("/api/archive/webhook/confirm"), opts); } catch (e) { handleError(e, opts.json); }
});
