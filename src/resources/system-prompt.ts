import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const systemPromptResource = new Command("system-prompt")
  .description("System prompt management");

systemPromptResource
  .command("get")
  .description("Get current system prompt")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/system-prompt"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

systemPromptResource
  .command("update")
  .description("Update system prompt")
  .requiredOption("--content <text>", "New prompt content")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.put("/api/system-prompt", { content: opts.content }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

systemPromptResource
  .command("default")
  .description("Get default system prompt")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/system-prompt/default"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

systemPromptResource
  .command("rollback")
  .description("Rollback to previous version")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/system-prompt/rollback"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

systemPromptResource
  .command("reset")
  .description("Reset to default")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/system-prompt/reset"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

systemPromptResource
  .command("history")
  .description("Get prompt history")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/system-prompt/history"), opts); }
    catch (err) { handleError(err, opts.json); }
  });
