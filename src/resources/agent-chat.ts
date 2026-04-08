import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const agentChatResource = new Command("agent-chat")
  .description("Agent multi-channel chat");

// --- Threads ---
agentChatResource
  .command("threads")
  .description("List chat threads")
  .option("--page <n>", "Page number", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/agent-chat/threads", { page: opts.page }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("thread-create")
  .description("Create a chat thread")
  .requiredOption("--agent <id>", "Agent ID")
  .option("--channel <ch>", "Channel (web/slack/whatsapp)", "web")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      output(await client.post("/api/agent-chat/threads", { agent_id: opts.agent, channel: opts.channel }), opts);
    } catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("thread-get")
  .description("Get thread details")
  .argument("<id>", "Thread ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/agent-chat/threads/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("thread-close")
  .description("Close a thread")
  .argument("<id>", "Thread ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/agent-chat/threads/${id}/close`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("thread-delete")
  .description("Delete a thread")
  .argument("<id>", "Thread ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/agent-chat/threads/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Messages ---
agentChatResource
  .command("messages")
  .description("List thread messages")
  .argument("<thread-id>", "Thread ID")
  .option("--json", "JSON output")
  .action(async (threadId, opts) => {
    try { output(await client.get(`/api/agent-chat/threads/${threadId}/messages`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("send")
  .description("Send a message in a thread")
  .argument("<thread-id>", "Thread ID")
  .requiredOption("--content <text>", "Message content")
  .option("--json", "JSON output")
  .action(async (threadId, opts) => {
    try { output(await client.post(`/api/agent-chat/threads/${threadId}/chat`, { content: opts.content }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Channels ---
agentChatResource
  .command("channels")
  .description("List agent channels")
  .argument("<agent-id>", "Agent ID")
  .option("--json", "JSON output")
  .action(async (agentId, opts) => {
    try { output(await client.get(`/api/agent-chat/agents/${agentId}/channels`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("channel-config")
  .description("Get/update channel config")
  .argument("<agent-id>", "Agent ID")
  .argument("<channel>", "Channel (web/slack/whatsapp)")
  .option("--json", "JSON output")
  .action(async (agentId, channel, opts) => {
    try { output(await client.get(`/api/agent-chat/agents/${agentId}/channels/${channel}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Dashboard ---
agentChatResource
  .command("dashboard")
  .description("Chat dashboard stats")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/agent-chat/dashboard/stats"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

agentChatResource
  .command("search")
  .description("Search chat messages")
  .requiredOption("--query <q>", "Search query")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/agent-chat/dashboard/search", { q: opts.query }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
