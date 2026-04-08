import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const notificationsResource = new Command("notifications")
  .description("Notifications, Email Templates & Push");

// --- Notifications ---
notificationsResource
  .command("list")
  .description("List notifications")
  .option("--page <n>", "Page number", "1")
  .option("--unread", "Only unread")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { page: opts.page };
      if (opts.unread) params.unread = "true";
      output(await client.get("/api/v1/notifications", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("read-all")
  .description("Mark all notifications as read")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/notifications/read"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("read")
  .description("Mark a notification as read")
  .argument("<id>", "Notification ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.post(`/api/v1/notifications/${id}/read`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("settings")
  .description("Get notification settings")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/notifications/settings"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("settings-update")
  .description("Update notification settings")
  .option("--email <bool>", "Email notifications")
  .option("--push <bool>", "Push notifications")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.email !== undefined) body.email = opts.email === "true";
      if (opts.push !== undefined) body.push = opts.push === "true";
      output(await client.put("/api/v1/notifications/settings", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("test")
  .description("Send a test notification")
  .option("--channel <ch>", "Channel (email/push)", "email")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/v1/notifications/test", { channel: opts.channel }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Email Templates ---
notificationsResource
  .command("templates")
  .description("List email templates")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/v1/email-templates"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("template-get")
  .description("Get email template")
  .argument("<id>", "Template ID")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try { output(await client.get(`/api/v1/email-templates/${id}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("template-update")
  .description("Update email template")
  .argument("<id>", "Template ID")
  .option("--subject <s>", "Subject")
  .option("--body <html>", "HTML body")
  .option("--json", "JSON output")
  .action(async (id, opts) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.subject) body.subject = opts.subject;
      if (opts.body) body.body = opts.body;
      output(await client.patch(`/api/v1/email-templates/${id}`, body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

// --- Push ---
notificationsResource
  .command("push-subscribe")
  .description("Subscribe to push notifications")
  .requiredOption("--subscription <json>", "Push subscription JSON")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/push", JSON.parse(opts.subscription)), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("push-unsubscribe")
  .description("Unsubscribe from push")
  .requiredOption("--endpoint <url>", "Push endpoint URL")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/api/push/unsubscribe", { endpoint: opts.endpoint }), opts); }
    catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("push-send")
  .description("Send a push notification")
  .requiredOption("--title <title>", "Title")
  .option("--body <body>", "Body")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const body: Record<string, unknown> = { title: opts.title };
      if (opts.body) body.body = opts.body;
      output(await client.post("/api/push/send", body), opts);
    } catch (err) { handleError(err, opts.json); }
  });

notificationsResource
  .command("vapid-key")
  .description("Get VAPID public key")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/push/vapid-public-key"), opts); }
    catch (err) { handleError(err, opts.json); }
  });
