import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

// --- Webhooks ---
export const webhooksResource = new Command("webhooks")
  .description("Webhooks (GitHub, Stripe, Brevo, IOPOLE, Zammad)");

webhooksResource
  .command("github-status")
  .description("GitHub webhook status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/webhooks/github/status"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- i18n ---
export const i18nResource = new Command("i18n")
  .description("Internationalization & LLM translation");

i18nResource
  .command("locales")
  .description("List available locales")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/i18n"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

i18nResource
  .command("translate")
  .description("Translate text via LLM")
  .requiredOption("--text <text>", "Text to translate")
  .requiredOption("--target <lang>", "Target language code")
  .option("--source <lang>", "Source language")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { text: opts.text, target: opts.target };
      if (opts.source) body.source = opts.source;
      output(await client.post("/api/i18n/translate", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Onboarding ---
export const onboardingResource = new Command("onboarding")
  .description("Post-purchase onboarding");

onboardingResource
  .command("status")
  .description("Get onboarding status")
  .option("--company <id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.company) params.company_id = opts.company;
      output(await client.get("/api/v1/onboarding", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

onboardingResource
  .command("start")
  .description("Start onboarding")
  .requiredOption("--company <id>", "Company ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/onboarding", { company_id: opts.company }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Referrals ---
export const referralsResource = new Command("referrals")
  .description("Referral program");

referralsResource
  .command("list")
  .description("List referrals")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/referrals"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

referralsResource
  .command("create")
  .description("Create a referral")
  .requiredOption("--email <email>", "Referred email")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/referrals", { email: opts.email }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Help Center ---
export const helpCenterResource = new Command("help-center")
  .description("Help Center (Zammad KB proxy)");

helpCenterResource
  .command("articles")
  .description("List help center articles")
  .option("--search <q>", "Search query")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.search) params.search = opts.search;
      output(await client.get("/api/v1/help-center", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Dunning ---
export const dunningResource = new Command("dunning")
  .description("Payment dunning (relances)");

dunningResource
  .command("list")
  .description("List dunning campaigns")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/dunning"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

dunningResource
  .command("trigger")
  .description("Trigger dunning for overdue invoices")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/dunning"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Cancellations ---
export const cancellationsResource = new Command("cancellations")
  .description("Subscription cancellation flow");

cancellationsResource
  .command("list")
  .description("List cancellation requests")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/cancellations"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

cancellationsResource
  .command("create")
  .description("Request cancellation")
  .requiredOption("--subscription <id>", "Subscription ID")
  .option("--reason <reason>", "Cancellation reason")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { subscription_id: opts.subscription };
      if (opts.reason) body.reason = opts.reason;
      output(await client.post("/api/cancellations", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Legal Pages ---
export const legalPagesResource = new Command("legal-pages")
  .description("Legal pages (CGV, CGU, mentions légales)");

legalPagesResource
  .command("list")
  .description("List legal pages")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/legal-pages"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

legalPagesResource
  .command("get")
  .description("Get legal page")
  .argument("<id>", "Page ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/legal-pages/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

legalPagesResource
  .command("update")
  .description("Update a legal page")
  .argument("<id>", "Page ID")
  .option("--content <html>", "Page content")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.content) body.content = opts.content;
      output(await client.patch(`/api/legal-pages/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- User Credentials ---
export const userCredentialsResource = new Command("user-credentials")
  .description("User credentials (CLI tokens, API keys for services)");

userCredentialsResource
  .command("list")
  .description("List credentials")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/credentials"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

userCredentialsResource
  .command("presets")
  .description("List credential presets")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/credentials/presets"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

userCredentialsResource
  .command("get")
  .description("Get credential details")
  .argument("<id>", "Credential ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/credentials/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

userCredentialsResource
  .command("create")
  .description("Create a credential")
  .requiredOption("--name <name>", "Credential name")
  .requiredOption("--type <type>", "Credential type")
  .requiredOption("--value <value>", "Credential value")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      output(await client.post("/api/credentials", { name: opts.name, type: opts.type, value: opts.value }), opts);
    } catch (err) { handleError(err, opts.json); }
  });

userCredentialsResource
  .command("delete")
  .description("Delete a credential")
  .argument("<id>", "Credential ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/credentials/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Brainstorm ---
export const brainstormResource = new Command("brainstorm")
  .description("AI brainstorm sessions");

brainstormResource
  .command("start")
  .description("Start a brainstorm session")
  .requiredOption("--topic <topic>", "Topic")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/brainstorm", { topic: opts.topic }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

brainstormResource
  .command("list")
  .description("List brainstorm sessions")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/brainstorm"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Claude Accounts ---
export const claudeAccountsResource = new Command("claude-accounts")
  .description("Claude account settings");

claudeAccountsResource
  .command("list")
  .description("List Claude accounts")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/settings/claude/accounts"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

claudeAccountsResource
  .command("create")
  .description("Add a Claude account")
  .requiredOption("--name <name>", "Account name")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/settings/claude/accounts", { name: opts.name }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Plugins ---
export const pluginsResource = new Command("plugins")
  .description("Plugins & extensions");

pluginsResource
  .command("list")
  .description("List plugins")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/plugins"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Events ---
export const eventsResource = new Command("events")
  .description("Event bus");

eventsResource
  .command("list")
  .description("List events")
  .option("--page <n>", "Page number", "1")
  .option("--type <t>", "Filter by type")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.type) params.type = opts.type;
      output(await client.get("/api/events", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Images ---
export const imagesResource = new Command("images")
  .description("Image management");

imagesResource
  .command("list")
  .description("List images")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/images"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

imagesResource
  .command("get")
  .description("Get image details")
  .argument("<id>", "Image ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/images/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
