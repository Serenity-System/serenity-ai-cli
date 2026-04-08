import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const usersResource = new Command("users")
  .description("User profile & preferences");

usersResource
  .command("me")
  .description("Get current user profile")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/users/me"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

usersResource
  .command("preferences")
  .description("Get all preferences")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/users/preferences"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

usersResource
  .command("preferences-update")
  .description("Update preferences")
  .option("--data <json>", "Preferences JSON")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.put("/api/users/preferences", opts.data ? JSON.parse(opts.data) : {}), opts); }
    catch (err) { handleError(err, opts.json); }
  });

for (const section of ["gemini", "claude", "global", "teams", "skills", "workspace"]) {
  usersResource
    .command(`pref-${section}`)
    .description(`Get ${section} preferences`)
    .option("--json", "JSON output")
    .action(async (opts) => {
      try { output(await client.get(`/api/users/preferences/${section}`), opts); }
      catch (err) { handleError(err, opts.json); }
    });
}

// --- 2FA ---
usersResource
  .command("2fa-status")
  .description("Get 2FA status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/auth/2fa/status"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

usersResource
  .command("2fa-setup")
  .description("Setup 2FA")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/auth/2fa/setup"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

usersResource
  .command("2fa-verify-setup")
  .description("Verify 2FA setup")
  .requiredOption("--code <code>", "TOTP code")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/auth/2fa/verify-setup", { code: opts.code }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

usersResource
  .command("2fa-disable")
  .description("Disable 2FA")
  .requiredOption("--code <code>", "TOTP code")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/auth/2fa/disable", { code: opts.code }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

usersResource
  .command("2fa-recovery-codes")
  .description("Get 2FA recovery codes")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/auth/2fa/recovery-codes"), opts); }
    catch (err) { handleError(err, opts.json); }
  });
