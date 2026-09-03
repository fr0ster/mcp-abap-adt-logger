# @mcp-abap-adt/logger
[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)

Logger interface and implementations for MCP ABAP ADT packages.

## Installation

```bash
npm install @mcp-abap-adt/logger
```

For structured logging with Pino (optional):

```bash
npm install pino pino-pretty
```

## Usage

### DefaultLogger (Synchronous)

`DefaultLogger` provides synchronous logging with icons and level prefixes, ideal for tests and CLI tools:

```typescript
import { defaultLogger, DefaultLogger, LogLevel } from '@mcp-abap-adt/logger';

// Use default logger singleton
defaultLogger.info('Hello, world!');
defaultLogger.debug('Debug message');
defaultLogger.error('Error message');
defaultLogger.warn('Warning message');

// Create custom logger instance with specific log level
const logger = new DefaultLogger(LogLevel.DEBUG);
logger.info('Test info');  // Output: [INFO] ℹ️ Test info
logger.debug('Test debug'); // Output: [DEBUG] 🐛 Test debug
```

### PinoLogger (Asynchronous)

`PinoLogger` provides structured logging using Pino, ideal for server applications:

```typescript
import { PinoLogger, LogLevel } from '@mcp-abap-adt/logger';

// Create Pino logger (falls back to DefaultLogger if pino is not installed)
const logger = new PinoLogger(LogLevel.DEBUG);
logger.info('Server started');  // Output: ℹ️ Server started (with pino-pretty formatting)
logger.debug('Debug info');
logger.error('Error occurred');
logger.warn('Warning message');
```

**Note**: `PinoLogger` uses async transport, so logs may appear after test completion in Jest. This is expected behavior for server use.

### Log Levels

Log levels are defined in `@mcp-abap-adt/interfaces` and controlled by `AUTH_LOG_LEVEL` environment variable:

```typescript
import { LogLevel } from '@mcp-abap-adt/interfaces';

// LogLevel enum values:
// LogLevel.ERROR = 0
// LogLevel.WARN = 1
// LogLevel.INFO = 2
// LogLevel.DEBUG = 3
```

Environment variable values:
- `error` - only errors
- `warn` - errors and warnings
- `info` - errors, warnings, and info (default)
- `debug` - all messages

```bash
export AUTH_LOG_LEVEL=debug
```

For backward compatibility, `DEBUG_AUTH_LOG=true` also sets level to debug.

### Logger Interface

All logger implementations implement the `ILogger` interface from `@mcp-abap-adt/interfaces`:

```typescript
import type { ILogger } from '@mcp-abap-adt/interfaces';

interface ILogger {
  info(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
}

// Create custom logger
class MyCustomLogger implements ILogger {
  info(message: string, meta?: any): void {
    // Custom implementation
  }
  debug(message: string, meta?: any): void {
    // Custom implementation
  }
  error(message: string, meta?: any): void {
    // Custom implementation
  }
  warn(message: string, meta?: any): void {
    // Custom implementation
  }
}
```

### Output Format

**DefaultLogger** output format:
- `[INFO] ℹ️ message`
- `[DEBUG] 🐛 message`
- `[ERROR] 💥 message`
- `[WARN] ⚠️ message`

**PinoLogger** output format (with pino-pretty):
- Structured JSON in production
- Pretty formatted with colors and icons in development (NODE_ENV !== 'production')

## License

**GNU Lesser General Public License v3.0 only** (`LGPL-3.0-only`).
Earlier published versions were MIT and stay MIT — a licence change is not
retroactive.

Copyright © 2024 Oleksii Kyslytsia

This library is free software: you can redistribute it and/or modify it under the
terms of the GNU Lesser General Public License as published by the Free Software
Foundation, version 3.

It is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE. See the GNU Lesser General Public License for more details.

Both texts ship with the package and both are needed: [`LICENSE`](LICENSE) is the
LGPL, [`COPYING`](COPYING) is the GPL it is written on top of, since the LGPL is a
set of additional permissions over the GPL and cannot be read alone.

**What this means if you depend on this package.** Linking it into your own
program — importing it, as every consumer of an npm package does — does not put
your program under the LGPL. What the licence asks is that changes *to this
library* stay free, and that your users can replace it with their own build.

