import { Injectable } from '@angular/core';

import { LogLevel } from '@core/models/log-level';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  #trace = (level: LogLevel, context = '', ...args: unknown[]): void => {
    if (environment.production && level === LogLevel.DEBUG) {
      return;
    }

    const consoleMethod = (console as Record<LogLevel, (...args: unknown[]) => void>)[level];
    const timestamp = new Date().toISOString();
    const ctx = context ? `[${context}]` : '';

    // example: [2025-01-01T12:00:00.000Z][INFO][MyComponent] Message
    consoleMethod(`[${timestamp}][${level.toUpperCase()}]${ctx} `, ...args);
  };

  debug(context = '', ...args: unknown[]): void {
    this.#trace(LogLevel.DEBUG, context, ...args);
  }

  log(context = '', ...args: unknown[]): void {
    this.#trace(LogLevel.LOG, context, ...args);
  }

  info(context = '', ...args: unknown[]): void {
    this.#trace(LogLevel.INFO, context, ...args);
  }

  warn(context = '', ...args: unknown[]): void {
    this.#trace(LogLevel.WARN, context, ...args);
  }

  error(context = '', ...args: unknown[]): void {
    this.#trace(LogLevel.ERROR, context, ...args);
  }
}
