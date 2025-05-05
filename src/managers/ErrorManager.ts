import { PnpEventEmitter, PnpEventType } from '../events';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
}

export class PnpError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'PnpError';
  }
}

export class ErrorManager {
  private logLevel: LogLevel;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  private eventEmitter: PnpEventEmitter;

  constructor(
    eventEmitter: PnpEventEmitter,
    logLevel: LogLevel = LogLevel.INFO,
    maxLogs: number = 1000
  ) {
    this.eventEmitter = eventEmitter;
    this.logLevel = logLevel;
    this.maxLogs = maxLogs;
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
    this.eventEmitter.emit(PnpEventType.LOG, entry);
  }

  debug(message: string, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.addLog({
        level: LogLevel.DEBUG,
        message,
        timestamp: new Date(),
        context
      });
    }
  }

  info(message: string, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.addLog({
        level: LogLevel.INFO,
        message,
        timestamp: new Date(),
        context
      });
    }
  }

  warn(message: string, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.addLog({
        level: LogLevel.WARN,
        message,
        timestamp: new Date(),
        context
      });
    }
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.addLog({
        level: LogLevel.ERROR,
        message,
        timestamp: new Date(),
        context,
        error
      });
    }
  }

  getLogs(level?: LogLevel): LogEntry[] {
    return level
      ? this.logs.filter(entry => entry.level === level)
      : [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  handleError(error: Error | PnpError, context?: Record<string, any>): void {
    if (error instanceof PnpError) {
      this.error(error.message, error, { ...context, ...error.context });
    } else {
      this.error(error.message, error, context);
    }
  }
} 