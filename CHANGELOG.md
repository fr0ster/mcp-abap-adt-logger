# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2025-12-19

### Added
- **PinoLogger Implementation**: Added `PinoLogger` class for structured logging using Pino
  - Async logger for server use with pino-pretty formatting
  - Falls back to `DefaultLogger` if pino is not installed
  - Includes icons in log messages (ℹ️ info, 🐛 debug, ⚠️ warn, 💥 error)
  - Optional peer dependencies: `pino@^10.1.0` and `pino-pretty@^13.1.3`
  - **Usage**: `import { PinoLogger } from '@mcp-abap-adt/logger'; const logger = new PinoLogger();`
- **LogLevel from Interfaces**: Now uses `LogLevel` enum from `@mcp-abap-adt/interfaces` package
  - Standardized log level constants across all packages
  - **Migration**: Import `LogLevel` from `@mcp-abap-adt/interfaces` instead of local enum

### Changed
- **Package Structure Refactoring**: Reorganized code into separate files
  - `default-logger.ts`: `DefaultLogger` implementation with icons and prefixes
  - `pino-logger.ts`: `PinoLogger` implementation
  - `types.ts`: Type definitions and utility functions (`getLogLevel`, `Logger` type)
  - `index.ts`: Main entry point with all exports
- **DefaultLogger Enhancement**: Added icons to log messages
  - Format: `[LEVEL] icon message` (e.g., `[INFO] ℹ️ Test message`)
  - Icons: ℹ️ (info), 🐛 (debug), ⚠️ (warn), 💥 (error)
- **Dependency Update**: Updated `@mcp-abap-adt/interfaces` to `^0.1.14` (requires LogLevel export)

### Removed
- **Local LogLevel Enum**: Removed duplicate `LogLevel` enum from logger package
  - Now imported from `@mcp-abap-adt/interfaces`
  - **Migration**: Update imports: `import { LogLevel } from '@mcp-abap-adt/interfaces';`

## [0.1.1] - 2025-12-05

### Changed
- **ILogger Interface Integration**: Migrated to use `ILogger` interface from `@mcp-abap-adt/interfaces`
  - `DefaultLogger` and `TestLogger` now implement `ILogger` interface
  - `Logger` type is now an alias for `ILogger` for backward compatibility
  - All logger methods now support optional `meta` parameter as per `ILogger` interface
  - Dependency on `@mcp-abap-adt/interfaces@^0.1.1` added

### Removed
- **Extended Logger Methods**: Removed convenience methods that are not part of `ILogger` interface
  - Removed `browserAuth()`, `refresh()`, `success()`, `browserUrl()`, `browserOpening()`, `testSkip()` methods
  - Logger implementations now only provide standard `ILogger` methods: `info()`, `debug()`, `error()`, `warn()`
  - Removed convenience export functions for removed methods

### Added
- **npm Configuration**: Added `.npmrc` file with `prefer-online=true` to ensure packages are installed from npmjs.com registry instead of local file system dependencies

## [0.1.0] - 2025-12-04

### Added
- Initial release
- Logger interface
- DefaultLogger implementation
- TestLogger implementation
- Log level support (ERROR, WARN, INFO, DEBUG)
- Environment variable configuration (AUTH_LOG_LEVEL)

