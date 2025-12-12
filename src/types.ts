/**
 * Types and utilities for logger
 */

import { LogLevel } from '@mcp-abap-adt/interfaces';

/**
 * Logger interface - re-exported from @mcp-abap-adt/interfaces for backward compatibility
 * @deprecated Use ILogger from @mcp-abap-adt/interfaces for new code
 */
export type Logger = import('@mcp-abap-adt/interfaces').ILogger;

/**
 * Get log level from environment variable
 * AUTH_LOG_LEVEL can be: error, warn, info, debug
 * DEBUG_AUTH_LOG=true is also supported for backward compatibility (sets level to debug)
 */
export function getLogLevel(): LogLevel {
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
