export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export const logLevelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};
const logLevelLogger: Record<LogLevel, (message: string) => void> = {
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

let logLevel: LogLevel = 'info';

export const setLogLevel = (level: LogLevel) => {
  logLevel = level;
};

export const getLogLevel = () => logLevel;
export const getLogLevelPriority = (level: LogLevel) => logLevelPriority[level];
export const getLogLevelLogger = (level: LogLevel) => logLevelLogger[level];
export const isLogLevelEnabled = (level: LogLevel) => {
  return getLogLevelPriority(level) <= getLogLevelPriority(getLogLevel());
};
