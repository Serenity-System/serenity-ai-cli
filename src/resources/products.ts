import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const productsResource = new Command("products")
  .description("Product catalog");

productsResource
  .command("list")
  .description("List products")
  .option("--page <n>", "Page number", "1")
  .option("--category <id>", "Filter by category")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.category) params.category_id = opts.category;
      output(await client.get("/api/v1/products", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

productsResource
  .command("get")
  .description("Get product details")
  .argument("<id>", "Product ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/products/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

productsResource
  .command("create")
  .description("Create a product")
  .requiredOption("--name <name>", "Product name")
  .option("--description <desc>", "Description")
  .option("--category <id>", "Category ID")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { name: opts.name };
      if (opts.description) body.description = opts.description;
      if (opts.category) body.category_id = opts.category;
      output(await client.post("/api/v1/products", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

productsResource
  .command("update")
  .description("Update a product")
  .argument("<id>", "Product ID")
  .option("--name <name>", "Name")
  .option("--description <desc>", "Description")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.description) body.description = opts.description;
      output(await client.patch(`/api/v1/products/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

productsResource
  .command("delete")
  .description("Delete a product")
  .argument("<id>", "Product ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/v1/products/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

productsResource
  .command("addons")
  .description("List product addons")
  .argument("<id>", "Product ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/products/${id}/addons`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Categories ---
productsResource
  .command("categories")
  .description("List product categories")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/products/categories"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

productsResource
  .command("category-create")
  .description("Create a category")
  .requiredOption("--name <name>", "Category name")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/products/categories", { name: opts.name }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Pricings ---
productsResource
  .command("pricing-update")
  .description("Update a pricing")
  .argument("<id>", "Pricing ID")
  .option("--price <n>", "Price")
  .option("--billing-period <p>", "Billing period (monthly/yearly)")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.price) body.price = parseFloat(opts.price);
      if (opts.billingPeriod) body.billing_period = opts.billingPeriod;
      output(await client.patch(`/api/v1/products/pricings/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });
