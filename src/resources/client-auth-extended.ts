import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const clientAuthExtendedResource = new Command("client-auth-extended")
  .description("Client auth: magic link, Google, 2FA, password reset");

clientAuthExtendedResource.command("magic-link").description("Send magic link").requiredOption("--email <email>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/magic-link", { email: opts.email }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("magic-link-verify").description("Verify magic link token").requiredOption("--token <token>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/magic-link/verify", { token: opts.token }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("google").description("Google OAuth login").requiredOption("--id-token <token>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/google", { id_token: opts.idToken }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("verify-email-send").description("Send verification email").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/verify-email/send"), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("verify-email").description("Verify email with code").requiredOption("--code <code>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/verify-email", { code: opts.code }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("forgot-password").description("Send password reset email").requiredOption("--email <email>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/forgot-password", { email: opts.email }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("reset-password").description("Reset password with token").requiredOption("--token <token>").requiredOption("--password <password>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/reset-password", { token: opts.token, password: opts.password }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("change-password").description("Change current password").requiredOption("--current <current>").requiredOption("--new <newPwd>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/change-password", { current_password: opts.current, new_password: opts.new }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("2fa-setup").description("Setup 2FA").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/2fa/setup"), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("2fa-verify").description("Verify 2FA setup").requiredOption("--code <code>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/2fa/verify", { code: opts.code }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("2fa-login").description("Login with 2FA code").requiredOption("--code <code>").requiredOption("--session-token <token>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/client/auth/2fa/login", { code: opts.code, session_token: opts.sessionToken }), opts); } catch (e) { handleError(e, opts.json); }
});
clientAuthExtendedResource.command("2fa-disable").description("Disable 2FA").option("--json").action(async (opts) => {
  try { output(await client.delete("/api/client/auth/2fa"), opts); } catch (e) { handleError(e, opts.json); }
});
