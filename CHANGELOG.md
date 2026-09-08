# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2026-09-08

**Documentation only.**

Carries 0.3.0 with it: that version was tagged and never published, the same
way 0.2.0 was, so this is the release that actually reaches npm — and the
README a consumer installs is the one that explains the new floor.

### Changed

- **README says what 0.3.0 asks of a consumer**: the
  `@mcp-abap-adt/interfaces@^39.0.0` floor, why one copy of the contracts
  matters and how to check for it, and what the
  `PinoLogger initialization error: Cannot find module 'pino'` line is — the
  fallback reporting itself, not a failure. That message appears once per
  logger, so a test run building one per file prints it per file, which is how
  it was mistaken for a fault.

## [0.3.0] - 2026-09-08

**One copy of the contracts in a consumer's graph.**

Carries 0.2.0's licence change with it: that version was tagged and never
published, so this is the first release under LGPL-3.0-only.

### Changed

- **`@mcp-abap-adt/interfaces` floor moves from `^0.1.16` to `^39.0.0`.**

  Nothing here changed to allow it: this package uses `ILogger` and `LogLevel`,
  and neither has moved in thirty-nine majors. The floor had simply been left
  where it was while the contracts package went on without it.

  What that cost was not compilation but the dependency graph. A consumer that
  depends on both — `@mcp-abap-adt/adt-clients` does — ended up with two copies
  of the contracts: its own, and `0.1.19` underneath this one. Structurally
  identical interfaces from different files do not compare equal in TypeScript,
  so the second copy is a source of errors that read as impossible.


## [0.2.0] - 2026-09-03

### Licence

- **This package is now `LGPL-3.0-only`.** It was MIT up to and including 0.1.4, and
  those versions stay MIT — a licence change is not retroactive, and anyone
  already using 0.1.4 under MIT keeps that grant for 0.1.4.

  The library licence of the GNU family, chosen for what it does *not* ask:
  linking it into your own program — importing it, as every consumer of an npm
  package does — does not put your program under the LGPL. What it asks is that
  changes to this library stay free and that your users can substitute their own
  build of it.

  Both texts ship in the package: `LICENSE` is the LGPL, `COPYING` is the GPL it
  is written on top of. The LGPL is a set of additional permissions over the GPL,
  so it cannot be read without both.

  Copyright © 2025–2026 Oleksii Kyslytsia.


## [0.1.4] - 2025-12-22

### Changed
- **Biome Migration**: Migrated from ESLint/Prettier to Biome for linting and formatting
  - Added `@biomejs/biome` as dev dependency
  - Added `lint`, `lint:check`, and `format` scripts to package.json
  - Integrated Biome check into build process (`npx biome check src --diagnostic-level=error`)
  - Replaced `any` with `unknown` for `meta` parameters in logger methods to match `ILogger` interface
  - Added `PinoLoggerType` type for better type safety of pino logger instance

### Fixed
- Fixed type safety issues by replacing `any` with `unknown` in logger method signatures
- Improved type safety for `PinoLogger` by adding explicit type for pino logger instance

## [0.1.3] - 2025-12-13

### Changed
- Dependency bump: `@mcp-abap-adt/interfaces` to `^0.1.16` (timeout docs) to align with latest interfaces release

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
