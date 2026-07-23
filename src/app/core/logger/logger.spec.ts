import { type MockInstance, vi } from 'vitest';

import { LogLevel } from '@core/models/log-level';

import { environment } from '@environments/environment';

import { LoggerService } from './logger';

describe('LoggerService', () => {
  let logger: LoggerService;
  let consoleSpies: Record<LogLevel, MockInstance>;

  beforeEach(() => {
    logger = new LoggerService();
    consoleSpies = {
      [LogLevel.DEBUG]: vi.spyOn(console, 'debug').mockImplementation(() => undefined),
      [LogLevel.LOG]: vi.spyOn(console, 'log').mockImplementation(() => undefined),
      [LogLevel.INFO]: vi.spyOn(console, 'info').mockImplementation(() => undefined),
      [LogLevel.WARN]: vi.spyOn(console, 'warn').mockImplementation(() => undefined),
      [LogLevel.ERROR]: vi.spyOn(console, 'error').mockImplementation(() => undefined),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should route each level to the matching console method with a formatted prefix', () => {
    logger.debug('MyComponent', 'message');
    logger.log('MyComponent', 'message');
    logger.info('MyComponent', 'message');
    logger.warn('MyComponent', 'message');
    logger.error('MyComponent', 'message');

    for (const level of Object.values(LogLevel)) {
      expect(consoleSpies[level]).toHaveBeenCalledWith(
        expect.stringContaining(`[${level.toUpperCase()}][MyComponent]`),
        'message',
      );
    }
  });

  it('should omit the context marker when no context is given', () => {
    logger.debug();
    logger.log();
    logger.info();
    logger.warn();
    logger.error();

    for (const level of Object.values(LogLevel)) {
      expect(consoleSpies[level]).toHaveBeenCalledWith(expect.stringMatching(/\[[A-Z]+\] $/));
    }
  });

  it('should drop debug logs in production but keep the other levels', () => {
    environment.production = true;
    try {
      logger.debug('MyComponent', 'hidden');
      logger.warn('MyComponent', 'shown');
    } finally {
      environment.production = false;
    }

    expect(consoleSpies[LogLevel.DEBUG]).not.toHaveBeenCalled();
    expect(consoleSpies[LogLevel.WARN]).toHaveBeenCalled();
  });
});
