import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const monitoringResource = new Command("monitoring")
  .description("Monitoring, Health, Circuit Breakers, Prometheus");

monitoringResource
  .command("health")
  .description("Check API health")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/health"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Circuit Breakers ---
monitoringResource
  .command("circuit-breakers")
  .description("List circuit breakers")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/monitoring/circuit-breakers"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("circuit-breaker-get")
  .description("Get circuit breaker status")
  .argument("<name>", "Breaker name")
  .option("--json", "JSON output")
  .action(async (name, opts) => {
    try { output(await client.get(`/monitoring/circuit-breakers/${name}`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("circuit-breaker-reset")
  .description("Reset a circuit breaker")
  .argument("<name>", "Breaker name")
  .option("--json", "JSON output")
  .action(async (name, opts) => {
    try { output(await client.post(`/monitoring/circuit-breakers/${name}/reset`), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("circuit-breaker-reset-all")
  .description("Reset all circuit breakers")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.post("/monitoring/circuit-breakers/reset-all"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("rate-limiters")
  .description("List rate limiters")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/monitoring/rate-limiters"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("external-services")
  .description("External services status")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/monitoring/external-services"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

// --- Prometheus ---
monitoringResource
  .command("prometheus-overview")
  .description("Prometheus overview")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/monitoring/prometheus/overview"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("prometheus-timeseries")
  .description("Prometheus timeseries")
  .option("--query <q>", "PromQL query")
  .option("--range <r>", "Time range (1h/6h/24h/7d)", "1h")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { range: opts.range };
      if (opts.query) params.query = opts.query;
      output(await client.get("/api/monitoring/prometheus/timeseries", params), opts);
    } catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("prometheus-alerts")
  .description("Prometheus alerts")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/monitoring/prometheus/alerts"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("cluster")
  .description("Cluster overview")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/monitoring/prometheus/cluster"), opts); }
    catch (err) { handleError(err, opts.json); }
  });

monitoringResource
  .command("cluster-details")
  .description("Cluster details")
  .option("--json", "JSON output")
  .action(async (opts) => {
    try { output(await client.get("/api/monitoring/prometheus/cluster/details"), opts); }
    catch (err) { handleError(err, opts.json); }
  });
