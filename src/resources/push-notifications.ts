import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const pushNotificationsResource = new Command("push")
  .description("Web push notifications");

pushNotificationsResource.command("vapid-key").description("Get VAPID public key").option("--json").action(async (opts) => {
  try { output(await client.get("/api/push/vapid-public-key"), opts); } catch (e) { handleError(e, opts.json); }
});
pushNotificationsResource.command("subscribe").description("Subscribe to push notifications").requiredOption("--endpoint <url>").requiredOption("--keys <json>", "JSON {p256dh, auth}").option("--json").action(async (opts) => {
  try { output(await client.post("/api/push/subscribe", { endpoint: opts.endpoint, keys: JSON.parse(opts.keys) }), opts); } catch (e) { handleError(e, opts.json); }
});
pushNotificationsResource.command("unsubscribe").description("Unsubscribe from push").option("--json").action(async (opts) => {
  try { output(await client.delete("/api/push/unsubscribe"), opts); } catch (e) { handleError(e, opts.json); }
});
pushNotificationsResource.command("send").description("Send push notification").requiredOption("--title <title>").option("--body <body>").option("--url <url>").option("--user-id <id>").option("--json").action(async (opts) => {
  try { output(await client.post("/api/push/send", { title: opts.title, body: opts.body, url: opts.url, user_id: opts.userId }), opts); } catch (e) { handleError(e, opts.json); }
});
