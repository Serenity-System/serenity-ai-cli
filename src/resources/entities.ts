import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const entitiesResource = new Command("entities")
  .description("Multi-entity billing");

entitiesResource
  .command("list")
  .description("List entities")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/entities"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("get")
  .description("Get entity details")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/entities/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("create")
  .description("Create an entity")
  .requiredOption("--name <name>", "Entity name")
  .option("--siren <siren>", "SIREN")
  .option("--vat-number <vat>", "VAT number")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.siren) body.siren = opts.siren;
      if (opts.vatNumber) body.vat_number = opts.vatNumber;
      output(await client.post("/api/v1/entities", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("update")
  .description("Update an entity")
  .argument("<id>", "Entity ID")
  .option("--name <name>", "Name")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      output(await client.patch(`/api/v1/entities/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("delete")
  .description("Delete an entity")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/v1/entities/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("set-default")
  .description("Set entity as default")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/v1/entities/${id}/set-default`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("stripe-onboard")
  .description("Onboard entity to Stripe")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/v1/entities/${id}/stripe/onboard`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("stripe-status")
  .description("Get entity Stripe status")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/entities/${id}/stripe/status`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("iopole-enroll")
  .description("Enroll entity in IOPOLE")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/v1/entities/${id}/iopole/enroll`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

entitiesResource
  .command("brevo-verify")
  .description("Verify Brevo sender for entity")
  .argument("<id>", "Entity ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/v1/entities/${id}/brevo/verify-sender`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
