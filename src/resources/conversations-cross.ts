import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const conversationsCrossResource = new Command("conversations-cross")
  .description("Cross-conversation access (admin)");

conversationsCrossResource.command("list").description("List all conversations (admin)").option("--page <n>").option("--per-page <n>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/conversations/access", { page: opts.page, per_page: opts.perPage }), opts); } catch (e) { handleError(e, opts.json); }
});
conversationsCrossResource.command("search").description("Search across all conversations").requiredOption("--query <q>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/conversations/access/search", { query: opts.query }), opts); } catch (e) { handleError(e, opts.json); }
});
conversationsCrossResource.command("get").description("Get any conversation by ID").argument("<id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/conversations/access/${id}`), opts); } catch (e) { handleError(e, opts.json); }
});
