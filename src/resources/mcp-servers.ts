import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const mcpServersResource = new Command("mcp-servers")
  .description("MCP Server configurations");

mcpServersResource
  .command("list")
  .description("List MCP servers")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/mcp-servers"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

mcpServersResource
  .command("get")
  .description("Get MCP server details")
  .argument("<id>", "Server ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/mcp-servers/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

mcpServersResource
  .command("create")
  .description("Create an MCP server")
  .requiredOption("--name <name>", "Server name")
  .requiredOption("--url <url>", "Server URL")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      output(await client.post("/api/mcp-servers", { name: opts.name, url: opts.url }), opts);
    } catch (err) { handleError(err, opts.json); }
  });

mcpServersResource
  .command("update")
  .description("Update an MCP server")
  .argument("<id>", "Server ID")
  .option("--name <name>", "Name")
  .option("--url <url>", "URL")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.url) body.url = opts.url;
      output(await client.patch(`/api/mcp-servers/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

mcpServersResource
  .command("delete")
  .description("Delete an MCP server")
  .argument("<id>", "Server ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/mcp-servers/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });

mcpServersResource
  .command("test")
  .description("Test MCP server connectivity")
  .argument("<id>", "Server ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/mcp-servers/${id}/test`), opts); }
    catch (err) { handleError(err, opts.json); }
  });
