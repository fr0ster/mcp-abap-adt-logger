# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

