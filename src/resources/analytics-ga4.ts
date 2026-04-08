import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const analyticsGa4Resource = new Command("analytics-ga4")
  .description("Google Analytics 4 data");

analyticsGa4Resource.command("overview").description("GA4 overview metrics").option("--from <date>").option("--to <date>").option("--json").action(async (opts) => {
  try { output(await client.get("/api/analytics/ga4/overview", { from: opts.from, to: opts.to }), opts); } catch (e) { handleError(e, opts.json); }
});
analyticsGa4Resource.command("realtime").description("GA4 realtime data").option("--json").action(async (opts) => {
  try { output(await client.get("/api/analytics/ga4/realtime"), opts); } catch (e) { handleError(e, opts.json); }
});
