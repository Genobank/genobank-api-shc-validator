import * as dotenv from 'dotenv';

/**
 * Environment object interface.
 */
export interface Env {
  appEnv: string;
  appSecret: string;
  httpHost: string;
  httpPort: number;
}

/**
 * Load variables from .env.
 */
dotenv.config();

/**
 * Application environment.
 */
export const appEnv = process.env['APP_ENV'];

/**
 * Application secret.
 */
export const appSecret = process.env['APP_SECRET'];

/**
 * HTTP server hostname.
 */
export const httpHost = process.env['API_HOST'];

/**
 * HTTP server port.
 */
export const httpPort = parseInt(process.env['API_PORT']);
 