/**
 * Default logger implementation
 * Controls output based on AUTH_LOG_LEVEL environment variable:
 * - error: only errors
 * - warn: errors and warnings
 * - info: errors, warnings, and info (default)
 * - debug: all messages
 *
 * Uses process.stdout/stderr for clean output without stack traces
 */

import type { ILogger } from '@mcp-abap-adt/interfaces-utils';
import { LogLevel } from '@mcp-abap-adt/interfaces-utils';
import { getLogLevel } from './types';

export class DefaultLogger implements ILogger {
  private readonly logLevel: LogLevel;

  constructor(logLevel?: LogLevel) {
    this.logLevel = logLevel ?? getLogLevel();
  }

  info(message: string, meta?: unknown): void {
    if (this.logLevel >= LogLevel.INFO) {
      const icon = 'ℹ️';
      if (meta) {
        process.stdout.write(`[INFO] ${icon} ${message}\n`);
        process.stdout.write(`${JSON.stringify(meta)}\n`);
      } else {
        process.stdout.write(`[INFO] ${icon} ${message}\n`);
      }
    }
  }

  debug(message: string, meta?: unknown): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      const icon = '🐛';
      if (meta) {
        process.stdout.write(`[DEBUG] ${icon} ${message}\n`);
        process.stdout.write(`${JSON.stringify(meta)}\n`);
      } else {
        process.stdout.write(`[DEBUG] ${icon} ${message}\n`);
      }
    }
  }

  error(message: string, meta?: unknown): void {
    if (this.logLevel >= LogLevel.ERROR) {
      const icon = '💥';
      if (meta) {
        process.stderr.write(`[ERROR] ${icon} ${message}\n`);
        process.stderr.write(`${JSON.stringify(meta)}\n`);
      } else {
        process.stderr.write(`[ERROR] ${icon} ${message}\n`);
      }
    }
  }

  warn(message: string, meta?: unknown): void {
    if (this.logLevel >= LogLevel.WARN) {
      const icon = '⚠️';
      if (meta) {
        process.stderr.write(`[WARN] ${icon} ${message}\n`);
        process.stderr.write(`${JSON.stringify(meta)}\n`);
      } else {
        process.stderr.write(`[WARN] ${icon} ${message}\n`);
      }
    }
  }
}
