import { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync, chmodSync } from "fs";
import { dirname } from "path";
import { getTokenPath, AUTH_TYPE, AUTH_HEADER, APP_CLI, getEnv } from "./config.js";
import { CliError } from "./errors.js";

/** Env var names checked for token (in order of priority) */
const TOKEN_ENV_VARS = ["SERENITY_API_TOKEN", "SERENITY_TOKEN"];

/** Check if a token is configured for current env (env var or file) */
export function hasToken(): boolean {
  // Check env vars first
  for (const envVar of TOKEN_ENV_VARS) {
    if (process.env[envVar]) return true;
  }
  return existsSync(getTokenPath());
}

/** Read the stored token. Env var takes priority over file. Throws if not configured. */
export function getToken(): string {
  // Check env vars first (container-friendly)
  for (const envVar of TOKEN_ENV_VARS) {
    const val = process.env[envVar];
    if (val) return val.trim();
  }
  // Fall back to file
  const tokenPath = getTokenPath();
  if (!existsSync(tokenPath)) {
    const env = getEnv();
    throw new CliError(
      2,
      `No token configured for ${env}.`,
      `Set SERENITY_API_TOKEN env var, or run: ${APP_CLI} --env ${env} auth set <token>`,
    );
  }
  return readFileSync(tokenPath, "utf-8").trim();
}

/** Save a token to disk with restricted permissions (chmod 600). */
export function setToken(token: string): void {
  const tokenPath = getTokenPath();
  mkdirSync(dirname(tokenPath), { recursive: true });
  writeFileSync(tokenPath, token.trim(), { mode: 0o600 });
  chmodSync(tokenPath, 0o600);
}

/** Delete the stored token. */
export function removeToken(): void {
  const tokenPath = getTokenPath();
  if (existsSync(tokenPath)) {
    unlinkSync(tokenPath);
  }
}

/** Mask a token for display */
export function maskToken(token: string): string {
  if (token.length <= 12) return "****";
  return `${token.slice(0, 12)}...${token.slice(-4)}`;
}

/** Build the auth header */
export function buildAuthHeaders(): Record<string, string> {
  const token = getToken();
  switch (AUTH_TYPE) {
    case "bearer":
      return { [AUTH_HEADER]: `Bearer ${token}` };
    default:
      return { [AUTH_HEADER]: token };
  }
}
