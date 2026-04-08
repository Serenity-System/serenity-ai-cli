import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const rgpdExportResource = new Command("rgpd-export")
  .description("GDPR data export requests");

rgpdExportResource.command("request").description("Create export request").option("--json").action(async (opts) => {
  try { output(await client.post("/api/rgpd-export/requests"), opts); } catch (e) { handleError(e, opts.json); }
});
rgpdExportResource.command("process").description("Process export request").argument("<request-id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/rgpd-export/requests/${id}/process`), opts); } catch (e) { handleError(e, opts.json); }
});
rgpdExportResource.command("list").description("List my export requests").option("--json").action(async (opts) => {
  try { output(await client.get("/api/rgpd-export/requests"), opts); } catch (e) { handleError(e, opts.json); }
});
rgpdExportResource.command("get").description("Get export request details").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/rgpd-export/requests/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
rgpdExportResource.command("download").description("Download export data").argument("<request-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/rgpd-export/requests/${id}/download`), opts); } catch (e) { handleError(e, opts.json); }
});
rgpdExportResource.command("admin-list").description("Admin: list all export requests").option("--json").action(async (opts) => {
  try { output(await client.get("/api/rgpd-export/admin/requests"), opts); } catch (e) { handleError(e, opts.json); }
});
rgpdExportResource.command("admin-process").description("Admin: process export request").argument("<request-id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/rgpd-export/admin/requests/${id}/process`), opts); } catch (e) { handleError(e, opts.json); }
});
