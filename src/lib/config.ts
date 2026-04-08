import { homedir } from "os";
import { join } from "path";

/** Application name */
export const APP_NAME = "serenity-ai";
export const APP_CLI = "serenity-ai-cli";

/** Environment URLs */
export const ENVIRONMENTS: Record<string, string> = {
  prod: "https://ai.serenity-system.fr",
  stg: "https://stg.ai.serenity-system.fr",
};

/** Get current environment from flag or env var */
export function getEnv(): string {
  return globalFlags.env || process.env.SERENITY_ENV || "prod";
}

/** Get base URL for current environment */
export function getBaseUrl(): string {
  const env = getEnv();
  const url = ENVIRONMENTS[env];
  if (!url) {
    throw new Error(`Unknown environment: ${env}. Valid: ${Object.keys(ENVIRONMENTS).join(", ")}`);
  }
  return url;
}

/** Auth type: bearer */
export const AUTH_TYPE = "bearer";
export const AUTH_HEADER = "Authorization";

/** Path to the token file — per environment */
export function getTokenPath(): string {
  const env = getEnv();
  return join(homedir(), ".config", "tokens", `${APP_NAME}-cli-${env}.txt`);
}

/** Legacy compat */
export const TOKEN_PATH = join(homedir(), ".config", "tokens", `${APP_NAME}-cli.txt`);

/** Global state for output flags */
export const globalFlags = {
  json: false,
  format: "text" as "text" | "json" | "csv" | "yaml",
  verbose: false,
  noColor: false,
  noHeader: false,
  env: "" as string,
};
