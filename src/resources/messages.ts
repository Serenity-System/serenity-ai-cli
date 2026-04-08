import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const messagesResource = new Command("messages")
  .alias("msg")
  .description("Manage conversation messages");

messagesResource
  .command("list")
  .description("List messages in a conversation")
  .requiredOption("--conversation <id>", "Conversation ID")
  .option("--limit <n>", "Max results", "50")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get(`/api/conversations/${opts.conversation}/messages`, {
        limit: opts.limit,
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

messagesResource
  .command("send")
  .description("Send a message in a conversation")
  .requiredOption("--conversation <id>", "Conversation ID")
  .requiredOption("--content <text>", "Message content")
  .option("--role <role>", "Message role (user/assistant)", "user")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.post(`/api/conversations/${opts.conversation}/messages`, {
        content: opts.content,
        role: opts.role,
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

messagesResource
  .command("search")
  .description("Search messages across conversations")
  .requiredOption("--query <q>", "Search query")
  .option("--limit <n>", "Max results", "20")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/conversations/cross/search", {
        query: opts.query,
        limit: opts.limit,
      });
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
