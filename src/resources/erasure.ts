import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const erasureResource = new Command("erasure")
  .description("GDPR data erasure requests");

erasureResource.command("request").description("Create erasure request").requiredOption("--email <email>").option("--reason <reason>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/erasure/requests", { email: opts.email, reason: opts.reason }), opts); } catch (e) { handleError(e, opts.json); }
});
erasureResource.command("verify").description("Verify erasure request").argument("<request-id>").requiredOption("--code <code>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/erasure/requests/${id}/verify`, { code: opts.code }), opts); } catch (e) { handleError(e, opts.json); }
});
erasureResource.command("list").description("List erasure requests").option("--json").action(async (opts) => {
  try { output(await client.get("/api/erasure/requests"), opts); } catch (e) { handleError(e, opts.json); }
});
erasureResource.command("get").description("Get erasure request").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/erasure/requests/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
erasureResource.command("admin-list").description("Admin: list all erasure requests").option("--json").action(async (opts) => {
  try { output(await client.get("/api/erasure/admin/requests"), opts); } catch (e) { handleError(e, opts.json); }
});
erasureResource.command("admin-execute").description("Admin: execute erasure").argument("<request-id>").option("--json").action(async (id, opts) => {
  try { output(await client.post(`/api/erasure/admin/requests/${id}/execute`), opts); } catch (e) { handleError(e, opts.json); }
});
