import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentBrowserResource = new Command("agent-browser")
  .description("Agent browser sessions (Steel)");

agentBrowserResource
  .command("sessions")
  .description("List browser sessions for an agent")
  .argument("<agent-id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (agentId, opts) => {
    try { output(await client.get(`/api/agents/${agentId}/browser/sessions`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentBrowserResource
  .command("session-create")
  .description("Create a browser session")
  .argument("<agent-id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (agentId, opts) => {
    try { output(await client.post(`/api/agents/${agentId}/browser/sessions`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentBrowserResource
  .command("session-get")
  .description("Get browser session details")
  .argument("<agent-id>", "Agent ID")
  .argument("<session-id>", "Session ID")
  .option("--json", "JSON output")
  .action(async (agentId, sessionId, opts) => {
    try { output(await client.get(`/api/agents/${agentId}/browser/sessions/${sessionId}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentBrowserResource
  .command("session-delete")
  .description("Delete a browser session")
  .argument("<agent-id>", "Agent ID")
  .argument("<session-id>", "Session ID")
  .option("--json", "JSON output")
  .action(async (agentId, sessionId, opts) => {
    try { await client.delete(`/api/agents/${agentId}/browser/sessions/${sessionId}`); output({ deleted: true }, opts); }
    catch (err) { handleError(err, opts.json); }
  });
