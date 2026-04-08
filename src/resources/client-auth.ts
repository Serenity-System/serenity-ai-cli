import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const clientAuthResource = new Command("client-auth")
  .description("Client panel authentication");

clientAuthResource
  .command("register")
  .description("Register a new client")
  .requiredOption("--email <email>", "Email")
  .requiredOption("--password <pw>", "Password")
  .option("--first-name <name>", "First name")
  .option("--last-name <name>", "Last name")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { email: opts.email, password: opts.password };
      if (opts.firstName) body.first_name = opts.firstName;
      if (opts.lastName) body.last_name = opts.lastName;
      output(await client.post("/api/client/auth/register", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

clientAuthResource
  .command("login")
  .description("Client login")
  .requiredOption("--email <email>", "Email")
  .requiredOption("--password <pw>", "Password")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/client/auth/login", { email: opts.email, password: opts.password }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientAuthResource
  .command("me")
  .description("Get current client info")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/client/auth/me"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientAuthResource
  .command("magic-link")
  .description("Send magic link")
  .requiredOption("--email <email>", "Email")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/client/auth/magic-link", { email: opts.email }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientAuthResource
  .command("forgot-password")
  .description("Request password reset")
  .requiredOption("--email <email>", "Email")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/client/auth/forgot-password", { email: opts.email }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientAuthResource
  .command("2fa-setup")
  .description("Setup 2FA")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/client/auth/2fa/setup"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

clientAuthResource
  .command("2fa-verify")
  .description("Verify 2FA code")
  .requiredOption("--code <code>", "TOTP code")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/client/auth/2fa/verify", { code: opts.code }), opts); }
    catch (err) { handleError(err, opts.json); }
  });
