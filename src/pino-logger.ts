/**
 * PinoLogger - Structured logging using Pino (optional dependency)
 *
 * If pino is not installed, falls back to DefaultLogger behavior.
 *
 * Install pino: npm install pino pino-pretty
 *
 * Usage:
 * ```typescript
 * import { PinoLogger } from '@mcp-abap-adt/logger';
 * const logger = new PinoLogger();
 * logger.info('Test message');
 * ```
 */

import type { ILogger } from '@mcp-abap-adt/interfaces';
import { LogLevel } from '@mcp-abap-adt/interfaces';
import { DefaultLogger } from './default-logger';
import { getLogLevel } from './types';

type PinoLoggerType = {
  info: (msg: string | unknown, ...args: unknown[]) => void;
  debug: (msg: string | unknown, ...args: unknown[]) => void;
  warn: (msg: string | unknown, ...args: unknown[]) => void;
  error: (msg: string | unknown, ...args: unknown[]) => void;
};

export class PinoLogger implements ILogger {
  private pinoLogger: PinoLoggerType | null;
  private logLevel: LogLevel;
  private fallbackLogger: DefaultLogger;

  constructor(logLevel?: LogLevel) {
    this.logLevel = logLevel ?? getLogLevel();
    this.fallbackLogger = new DefaultLogger(this.logLevel);

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pino = require('pino');

      const isDev = process.env.NODE_ENV !== 'production';

      this.pinoLogger = pino({
        level: this.logLevelToPinoLevel(this.logLevel),
        redact: ['password', 'token', 'headers.authorization'],
        transport: isDev
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            }
          : undefined,
      }) as PinoLoggerType;
    } catch (error: any) {
      this.pinoLogger = null;
      // Log error in development for debugging
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'PinoLogger initialization error:',
          error?.message || error,
        );
      }
    }
  }

  private logLevelToPinoLevel(level: LogLevel): string {
    switch (level) {
      case LogLevel.ERROR:
        return 'error';
      case LogLevel.WARN:
        return 'warn';
      case LogLevel.INFO:
        return 'info';
      case LogLevel.DEBUG:
        return 'debug';
      default:
        return 'info';
    }
  }

  info(message: string, meta?: unknown): void {
    if (this.logLevel < LogLevel.INFO) return;

    if (this.pinoLogger) {
      const iconMessage = `ℹ️ ${message}`;
      if (meta) {
        this.pinoLogger.info(meta, iconMessage);
      } else {
        this.pinoLogger.info(iconMessage);
      }
    } else {
      this.fallbackLogger.info(message, meta);
    }
  }

  debug(message: string, meta?: unknown): void {
    if (this.logLevel < LogLevel.DEBUG) return;

    if (this.pinoLogger) {
      const iconMessage = `🐛 ${message}`;
      if (meta) {
        this.pinoLogger.debug(meta, iconMessage);
      } else {
        this.pinoLogger.debug(iconMessage);
      }
    } else {
      this.fallbackLogger.debug(message, meta);
    }
  }

  warn(message: string, meta?: unknown): void {
    if (this.logLevel < LogLevel.WARN) return;

    if (this.pinoLogger) {
      const iconMessage = `⚠️ ${message}`;
      if (meta) {
        this.pinoLogger.warn(meta, iconMessage);
      } else {
        this.pinoLogger.warn(iconMessage);
      }
    } else {
      this.fallbackLogger.warn(message, meta);
    }
  }

  error(message: string, meta?: unknown): void {
    if (this.logLevel < LogLevel.ERROR) return;

    if (this.pinoLogger) {
      const iconMessage = `💥 ${message}`;
      if (meta) {
        this.pinoLogger.error(meta, iconMessage);
      } else {
        this.pinoLogger.error(iconMessage);
      }
    } else {
      this.fallbackLogger.error(message, meta);
    }
  }
}
