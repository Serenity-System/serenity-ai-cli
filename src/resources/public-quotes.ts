import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const publicQuotesResource = new Command("public-quotes")
  .description("Public quote requests");

publicQuotesResource.command("request").description("Request a quote").requiredOption("--name <name>").requiredOption("--email <email>").requiredOption("--products <json>", "JSON array of product slugs").option("--company <company>").option("--message <msg>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/v1/public/quotes/request", { name: opts.name, email: opts.email, products: JSON.parse(opts.products), company: opts.company, message: opts.message }, { noAuth: true }), opts); } catch (e) { handleError(e, opts.json); }
});
