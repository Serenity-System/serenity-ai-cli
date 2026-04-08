import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const hallucinationsResource = new Command("hallucinations")
  .description("Conversation hallucination detection");

hallucinationsResource.command("list").description("List detected hallucinations").argument("<conversation-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/conversations/${id}/hallucinations`), opts); } catch (e) { handleError(e, opts.json); }
});
hallucinationsResource.command("summary").description("Hallucination summary").argument("<conversation-id>").option("--json").action(async (id, opts) => {
  try { output(await client.get(`/api/conversations/${id}/hallucination-summary`), opts); } catch (e) { handleError(e, opts.json); }
});
