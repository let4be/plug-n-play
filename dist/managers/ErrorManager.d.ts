import { PnpEventEmitter } from '../events';
export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    context?: Record<string, any>;
    error?: Error;
}
export declare class PnpError extends Error {
    code: string;
    context?: Record<string, any>;
    constructor(message: string, code: string, context?: Record<string, any>);
}
export declare class ErrorManager {
    private logLevel;
    private logs;
    private maxLogs;
    private eventEmitter;
    constructor(eventEmitter: PnpEventEmitter, logLevel?: LogLevel, maxLogs?: number);
    setLogLevel(level: LogLevel): void;
    private shouldLog;
    private addLog;
    debug(message: string, context?: Record<string, any>): void;
    info(message: string, context?: Record<string, any>): void;
    warn(message: string, context?: Record<string, any>): void;
    error(message: string, error?: Error, context?: Record<string, any>): void;
    getLogs(level?: LogLevel): LogEntry[];
    clearLogs(): void;
    handleError(error: Error | PnpError, context?: Record<string, any>): void;
}
