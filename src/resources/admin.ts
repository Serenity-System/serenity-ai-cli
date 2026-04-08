import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const adminResource = new Command("admin")
  .description("Admin — Users, GC, Events, Service Config, Provisioning, Gandi, IOPOLE");

// --- Users ---
adminResource
  .command("users")
  .description("List admin users")
  .option("--page <n>", "Page number", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/admin/users", { page: opts.page }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("user-get")
  .description("Get user details")
  .argument("<id>", "User ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/admin/users/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("user-update")
  .description("Update a user")
  .argument("<id>", "User ID")
  .option("--role <role>", "Role")
  .option("--active <bool>", "Active (true/false)")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.role) body.role = opts.role;
      if (opts.active !== undefined) body.is_active = opts.active === "true";
      output(await client.patch(`/api/admin/users/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- GC ---
adminResource
  .command("gc")
  .description("Trigger garbage collection")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/admin/gc"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("gc-status")
  .description("Get GC status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/admin/gc"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Events ---
adminResource
  .command("events")
  .description("List admin events")
  .option("--page <n>", "Page number", "1")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/admin/events", { page: opts.page }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Service Config ---
adminResource
  .command("services")
  .description("List service configurations")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/admin/config/services"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("service-get")
  .description("Get service config")
  .argument("<service>", "Service name")
  .option("--json", "JSON output")
  .action(async (service, opts) => {
    try { output(await client.get(`/api/v1/admin/config/services/${service}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("service-update")
  .description("Update service config")
  .argument("<service>", "Service name")
  .option("--config <json>", "Config JSON")
  .option("--json", "JSON output")
  .action(async (service, opts) => {
    try {
      const body = opts.config ? JSON.parse(opts.config) : {};
      output(await client.put(`/api/v1/admin/config/services/${service}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("service-health")
  .description("Check service health")
  .argument("<service>", "Service name")
  .option("--json", "JSON output")
  .action(async (service, opts) => {
    try { output(await client.get(`/api/v1/admin/config/services/${service}/health`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

adminResource
  .command("service-rotate")
  .description("Rotate service credentials")
  .argument("<service>", "Service name")
  .option("--json", "JSON output")
  .action(async (service, opts) => {
    try { output(await client.post(`/api/v1/admin/config/services/${service}/rotate`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Provisioning ---
adminResource
  .command("provisioning")
  .description("List provisioning tasks")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      output(await client.get("/api/v1/admin/provisioning", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Decay (admin) ---
adminResource
  .command("decay")
  .description("Trigger memory decay")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/admin/decay"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Gandi admin ---
adminResource
  .command("gandi")
  .description("Gandi provisioning admin")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/admin/gandi"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- IOPOLE admin ---
adminResource
  .command("iopole")
  .description("IOPOLE admin")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/admin/iopole"), opts); }
    catch (err) { handleError(err, opts.json); }
  });
