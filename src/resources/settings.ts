import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const settingsResource = new Command("settings")
  .description("Manage user settings");

settingsResource
  .command("get")
  .description("Get current settings")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const data = await client.get("/api/settings");
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });

settingsResource
  .command("update")
  .description("Update settings")
  .option("--theme <theme>", "UI theme")
  .option("--language <lang>", "Language")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.theme) body.theme = opts.theme;
      if (opts.language) body.language = opts.language;
      const data = await client.patch("/api/settings", body);
      output(data, opts);
    } catch (err) { handleError(err, opts.json); }
  });
