/**
 * @mcp-abap-adt/logger
 * Logger interface and implementations for MCP ABAP ADT packages
 */

import type { ILogger } from '@mcp-abap-adt/interfaces-utils';
import { LogLevel } from '@mcp-abap-adt/interfaces-utils';
import { DefaultLogger } from './default-logger';
import { PinoLogger } from './pino-logger';

// Re-export types and utilities
export type { Logger } from './types';
export { getLogLevel } from './types';

// Re-export LogLevel from interfaces
export { LogLevel };

// Default logger instance (singleton)
export const defaultLogger: ILogger = new DefaultLogger();

// Pino logger instance (falls back to DefaultLogger if pino is not installed)
// Async logger for server use. Built on its first call, not at import: the
// PinoLogger constructor reports a missing pino, and a consumer that only
// imports DefaultLogger must not see that report.
let pinoInstance: PinoLogger | undefined;
const pino = (): PinoLogger => {
  pinoInstance ??= new PinoLogger();
  return pinoInstance;
};
export const pinoLogger: ILogger = {
  info: (message, meta) => pino().info(message, meta),
  debug: (message, meta) => pino().debug(message, meta),
  warn: (message, meta) => pino().warn(message, meta),
  error: (message, meta) => pino().error(message, meta),
};

// Re-export ILogger from interfaces for convenience
export type { ILogger } from '@mcp-abap-adt/interfaces-utils';
// Export classes for creating instances with specific log levels
export { DefaultLogger, PinoLogger };
