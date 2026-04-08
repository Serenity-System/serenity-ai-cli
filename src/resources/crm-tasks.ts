import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const crmTasksResource = new Command("crm-tasks")
  .description("CRM — Tasks");

crmTasksResource
  .command("list")
  .description("List CRM tasks")
  .option("--page <n>", "Page number", "1")
  .option("--status <s>", "Filter by status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.status) params.status = opts.status;
      output(await client.get("/api/crm/tasks", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmTasksResource
  .command("get")
  .description("Get task details")
  .argument("<id>", "Task ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/crm/tasks/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmTasksResource
  .command("create")
  .description("Create a CRM task")
  .requiredOption("--title <title>", "Task title")
  .option("--company <id>", "Company ID")
  .option("--due-date <date>", "Due date (YYYY-MM-DD)")
  .option("--priority <p>", "Priority (low/normal/high)")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { title: opts.title };
      if (opts.company) body.company_id = opts.company;
      if (opts.dueDate) body.due_date = opts.dueDate;
      if (opts.priority) body.priority = opts.priority;
      output(await client.post("/api/crm/tasks", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmTasksResource
  .command("update")
  .description("Update a CRM task")
  .argument("<id>", "Task ID")
  .option("--title <title>", "Title")
  .option("--status <s>", "Status")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.title) body.title = opts.title;
      if (opts.status) body.status = opts.status;
      output(await client.patch(`/api/crm/tasks/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

crmTasksResource
  .command("complete")
  .description("Mark task as complete")
  .argument("<id>", "Task ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/crm/tasks/${id}/complete`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

crmTasksResource
  .command("delete")
  .description("Delete a CRM task")
  .argument("<id>", "Task ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { await client.delete(`/api/crm/tasks/${id}`); output({ deleted: true, id }, opts); }
    catch (err) { handleError(err, opts.json); }
  });
