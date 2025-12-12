/**
 * @mcp-abap-adt/logger
 * Logger interface and implementations for MCP ABAP ADT packages
 */

import type { ILogger } from '@mcp-abap-adt/interfaces';
import { LogLevel } from '@mcp-abap-adt/interfaces';
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
// Async logger for server use
export const pinoLogger: ILogger = new PinoLogger();

// Export classes for creating instances with specific log levels
export { DefaultLogger, PinoLogger };

// Re-export ILogger from interfaces for convenience
export type { ILogger } from '@mcp-abap-adt/interfaces';