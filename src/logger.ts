/**
 * Logger interface and implementations for MCP ABAP ADT packages
 */

import type { ILogger } from '@mcp-abap-adt/interfaces';

/**
 * Log levels
 */
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

/**
 * Logger interface - re-exported from @mcp-abap-adt/interfaces for backward compatibility
 * @deprecated Use ILogger from @mcp-abap-adt/interfaces for new code
 */
export type Logger = ILogger;

/**
 * Get log level from environment variable
 * AUTH_LOG_LEVEL can be: error, warn, info, debug
 * DEBUG_AUTH_LOG=true is also supported for backward compatibility (sets level to debug)
 */
function getLogLevel(): LogLevel {
  const level = process.env.AUTH_LOG_LEVEL?.toLowerCase();
  if (level === 'error') return LogLevel.ERROR;
  if (level === 'warn') return LogLevel.WARN;
  if (level === 'info') return LogLevel.INFO;
  if (level === 'debug') return LogLevel.DEBUG;
  // Backward compatibility
  if (process.env.DEBUG_AUTH_LOG === 'true') return LogLevel.DEBUG;
  // Default: info level
  return LogLevel.INFO;
}

/**
 * Default logger implementation
 * Controls output based on AUTH_LOG_LEVEL environment variable:
 * - error: only errors
 * - warn: errors and warnings
 * - info: errors, warnings, and info (default)
 * - debug: all messages
 */
class DefaultLogger implements ILogger {
  private readonly logLevel: LogLevel;

  constructor(logLevel?: LogLevel) {
    this.logLevel = logLevel ?? getLogLevel();
  }

  info(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.INFO) {
      if (meta) {
        console.info(message, meta);
      } else {
        console.info(message);
      }
    }
  }

  debug(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      if (meta) {
        console.debug(`[DEBUG] ${message}`, meta);
      } else {
        console.debug(`[DEBUG] ${message}`);
      }
    }
  }

  error(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.ERROR) {
      if (meta) {
        console.error(message, meta);
      } else {
        console.error(message);
      }
    }
  }

  warn(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.WARN) {
      if (meta) {
        console.warn(`[WARN] ${message}`, meta);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    }
  }

  browserAuth(message: string): void {
    this.info(`🌐 ${message}`);
  }

  refresh(message: string): void {
    this.info(`🔄 ${message}`);
  }

  success(message: string): void {
    this.info(`✅ ${message}`);
  }

  browserUrl(url: string): void {
    // Always show URL when browser is not opened automatically (user needs to open manually)
    this.info(`🔗 Open in browser: ${url}`);
  }

  browserOpening(): void {
    // Only show when debug is enabled (browser opens automatically)
    this.debug(`🌐 Opening browser for authentication...`);
  }

  testSkip(message: string): void {
    this.info(`⏭️  ${message}`);
  }
}

/**
 * Test logger implementation
 * Uses same log levels as DefaultLogger
 */
class TestLogger implements ILogger {
  private readonly logLevel: LogLevel;

  constructor(logLevel?: LogLevel) {
    this.logLevel = logLevel ?? getLogLevel();
  }

  info(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.INFO) {
      if (meta) {
        console.info(message, meta);
      } else {
        console.info(message);
      }
    }
  }

  debug(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      if (meta) {
        console.info(`[DEBUG] ${message}`, meta);
      } else {
        console.info(`[DEBUG] ${message}`);
      }
    }
  }

  error(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.ERROR) {
      if (meta) {
        console.error(message, meta);
      } else {
        console.error(message);
      }
    }
  }

  warn(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.WARN) {
      if (meta) {
        console.warn(`[WARN] ${message}`, meta);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    }
  }

  browserAuth(message: string): void {
    this.info(`🌐 ${message}`);
  }

  refresh(message: string): void {
    this.info(`🔄 ${message}`);
  }

  success(message: string): void {
    this.info(`✅ ${message}`);
  }

  browserUrl(url: string): void {
    // Always show URL when browser is not opened automatically (user needs to open manually)
    this.info(`🔗 Open in browser: ${url}`);
  }

  browserOpening(): void {
    // Only show when debug is enabled (browser opens automatically)
    this.debug(`🌐 Opening browser for authentication...`);
  }

  testSkip(message: string): void {
    this.info(`⏭️  ${message}`);
  }
}

// Default logger instance (singleton)
export const defaultLogger: ILogger = new DefaultLogger();

// Test logger instance
export const testLogger: ILogger = new TestLogger();

// Export convenience functions that use default logger (for backward compatibility)
export function info(message: string, meta?: any): void {
  defaultLogger.info(message, meta);
}

export function debug(message: string, meta?: any): void {
  defaultLogger.debug(message, meta);
}

export function error(message: string, meta?: any): void {
  defaultLogger.error(message, meta);
}

export function warn(message: string, meta?: any): void {
  defaultLogger.warn(message, meta);
}

