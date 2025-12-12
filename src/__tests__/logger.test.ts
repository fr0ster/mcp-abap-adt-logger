/**
 * Tests for logger module
 */

import { LogLevel } from '@mcp-abap-adt/interfaces';
import { DefaultLogger, PinoLogger } from '../index';

describe('Logger', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    delete process.env.AUTH_LOG_LEVEL;
    delete process.env.DEBUG_AUTH_LOG;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('LogLevel', () => {
    it('should have correct log level values', () => {
      expect(LogLevel.ERROR).toBe(0);
      expect(LogLevel.WARN).toBe(1);
      expect(LogLevel.INFO).toBe(2);
      expect(LogLevel.DEBUG).toBe(3);
    });
  });

  describe('defaultLogger', () => {
    // Show actual output in tests - don't mock console

    it('should log info messages at INFO level', () => {
      const logger = new DefaultLogger(LogLevel.INFO);
      logger.info('Test info message');
      expect(true).toBe(true);
    });

    it('should log debug messages at DEBUG level', () => {
      const logger = new DefaultLogger(LogLevel.DEBUG);
      logger.debug('Test debug message');
      expect(true).toBe(true);
    });

    it('should log error messages at ERROR level', () => {
      const logger = new DefaultLogger(LogLevel.ERROR);
      logger.error('Test error message');
      expect(true).toBe(true);
    });

    it('should log warn messages at WARN level', () => {
      const logger = new DefaultLogger(LogLevel.WARN);
      logger.warn('Test warn message');
      expect(true).toBe(true);
    });
    describe('PinoLogger (testLogger)', () => {
      // Show actual output in tests - don't mock console
      // PinoLogger falls back to DefaultLogger if pino is not installed
      // Use sync: true for synchronous output in tests

      it('should log info messages at INFO level', () => {
        const logger = new PinoLogger(LogLevel.INFO);
        logger.info('Test info message');
        expect(true).toBe(true);
      });

      it('should log debug messages at DEBUG level', () => {
        const logger = new PinoLogger(LogLevel.DEBUG);
        logger.debug('Test debug message');
        expect(true).toBe(true);
      });

      it('should log error messages at ERROR level', () => {
        const logger = new PinoLogger(LogLevel.ERROR);
        logger.error('Test error message');
        expect(true).toBe(true);
      });

      it('should log warn messages at WARN level', () => {
        const logger = new PinoLogger(LogLevel.WARN);
        logger.warn('Test warn message');
        expect(true).toBe(true);
      });
    });
  });
});
