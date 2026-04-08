import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const twoFactorResource = new Command("two-factor")
  .description("Two-factor authentication (admin)");

twoFactorResource.command("setup").description("Start 2FA setup").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/auth/2fa/setup"), opts); } catch (e) { handleError(e, opts.json); }
});
twoFactorResource.command("verify-setup").description("Verify 2FA setup with code").requiredOption("--code <code>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/auth/2fa/verify-setup", { code: opts.code }), opts); } catch (e) { handleError(e, opts.json); }
});
twoFactorResource.command("disable").description("Disable 2FA").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/auth/2fa/disable"), opts); } catch (e) { handleError(e, opts.json); }
});
twoFactorResource.command("recovery-codes").description("Generate recovery codes").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/auth/2fa/recovery-codes"), opts); } catch (e) { handleError(e, opts.json); }
});
twoFactorResource.command("status").description("Get 2FA status").option("--json").action(async (opts) => {
  try { output(await client.get("/api/v1/auth/2fa/status"), opts); } catch (e) { handleError(e, opts.json); }
});
twoFactorResource.command("verify").description("Verify 2FA code").requiredOption("--code <code>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/auth/2fa/verify", { code: opts.code }), opts); } catch (e) { handleError(e, opts.json); }
});
