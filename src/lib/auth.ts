import { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync, chmodSync } from "fs";
import { dirname } from "path";
import { getTokenPath, AUTH_TYPE, AUTH_HEADER, APP_CLI, getEnv } from "./config.js";
import { CliError } from "./errors.js";

/** Check if a token is configured for current env */
export function hasToken(): boolean {
  return existsSync(getTokenPath());
}

/** Read the stored token. Throws if not configured. */
export function getToken(): string {
  const tokenPath = getTokenPath();
  if (!existsSync(tokenPath)) {
    const env = getEnv();
    throw new CliError(2, `No token configured for ${env}.`, `Run: ${APP_CLI} --env ${env} auth set <token>`);
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
