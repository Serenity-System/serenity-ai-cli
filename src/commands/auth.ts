import { Command } from "commander";
import { getToken, setToken, removeToken, hasToken, maskToken } from "../lib/auth.js";
import { client } from "../lib/client.js";
import { getEnv, getBaseUrl } from "../lib/config.js";
import { log } from "../lib/logger.js";
import { handleError } from "../lib/errors.js";

export const authCommand = new Command("auth").description("Manage API authentication");

authCommand
  .command("set")
  .description("Save your API token for current environment")
  .argument("<token>", "Your API token (sk-serenity-...)")
  .addHelpText("after", "\nExample:\n  serenity-ai-cli auth set sk-serenity-abc123\n  serenity-ai-cli --env stg auth set sk-serenity-xyz789")
  .action((token: string) => {
    setToken(token);
    log.success(`Token saved for ${getEnv()} (${getBaseUrl()})`);
  });

authCommand
  .command("show")
  .description("Display current token (masked)")
  .option("--raw", "Show the full unmasked token")
  .action((opts: { raw?: boolean }) => {
    if (!hasToken()) {
      log.warn(`No token configured for ${getEnv()}. Run: serenity-ai-cli --env ${getEnv()} auth set <token>`);
      return;
    }
    const token = getToken();
    const env = getEnv();
    console.log(`Environment: ${env} (${getBaseUrl()})`);
    console.log(`Token: ${opts.raw ? token : maskToken(token)}`);
  });

authCommand
  .command("remove")
  .description("Delete the saved token for current environment")
  .action(() => {
    removeToken();
    log.success(`Token removed for ${getEnv()}`);
  });

authCommand
  .command("test")
  .description("Verify your token works")
  .action(async () => {
    try {
      const data = await client.get("/api/auth/me") as Record<string, unknown>;
      log.success(`Authenticated as ${data.email ?? data.name ?? "OK"} on ${getEnv()} (${getBaseUrl()})`);
    } catch (err) {
      handleError(err);
    }
  });

authCommand
  .command("env")
  .description("Show current environment info")
  .action(() => {
    const env = getEnv();
    console.log(`Environment: ${env}`);
    console.log(`Base URL: ${getBaseUrl()}`);
    console.log(`Token: ${hasToken() ? "configured" : "not set"}`);
  });
