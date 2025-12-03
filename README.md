# @mcp-abap-adt/logger

Logger interface and implementations for MCP ABAP ADT packages.

## Installation

```bash
npm install @mcp-abap-adt/logger
```

## Usage

### Basic Usage

```typescript
import { Logger, defaultLogger, LogLevel } from '@mcp-abap-adt/logger';

// Use default logger
defaultLogger.info('Hello, world!');
defaultLogger.debug('Debug message');
defaultLogger.error('Error message');
defaultLogger.warn('Warning message');

// Specialized logging methods
defaultLogger.browserAuth('Starting browser authentication...');
defaultLogger.refresh('Refreshing token...');
defaultLogger.success('Operation completed successfully');
defaultLogger.browserUrl('https://example.com/auth');
defaultLogger.browserOpening();
defaultLogger.testSkip('Test skipped');
```

### Log Levels

Logger supports four log levels controlled by `AUTH_LOG_LEVEL` environment variable:

- `error` - only errors
- `warn` - errors and warnings
- `info` - errors, warnings, and info (default)
- `debug` - all messages

```bash
export AUTH_LOG_LEVEL=debug
```

For backward compatibility, `DEBUG_AUTH_LOG=true` also sets level to debug.

### Logger Interface

```typescript
import type { Logger } from '@mcp-abap-adt/logger';

class MyCustomLogger implements Logger {
  info(message: string): void {
    // Custom implementation
  }
  debug(message: string): void {
    // Custom implementation
  }
  error(message: string): void {
    // Custom implementation
  }
  warn(message: string): void {
    // Custom implementation
  }
  browserAuth(message: string): void {
    // Custom implementation
  }
  refresh(message: string): void {
    // Custom implementation
  }
  success(message: string): void {
    // Custom implementation
  }
  browserUrl(url: string): void {
    // Custom implementation
  }
  browserOpening(): void {
    // Custom implementation
  }
  testSkip(message: string): void {
    // Custom implementation
  }
}
```

### Convenience Functions

For backward compatibility, convenience functions are also exported:

```typescript
import { info, debug, error, warn, browserAuth, refresh, success, browserUrl, browserOpening, testSkip } from '@mcp-abap-adt/logger';

info('Info message');
debug('Debug message');
error('Error message');
warn('Warning message');
```

## License

MIT

