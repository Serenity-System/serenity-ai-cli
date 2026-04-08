import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const publicContactResource = new Command("public-contact")
  .description("Public contact form");

publicContactResource.command("send").description("Submit contact form").requiredOption("--name <name>").requiredOption("--email <email>").requiredOption("--message <msg>").requiredOption("--subject <subject>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/public/contact", { name: opts.name, email: opts.email, message: opts.message, subject: opts.subject }, { noAuth: true }), opts); } catch (e) { handleError(e, opts.json); }
});
